from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time
import os

def scrape_maize_pages_organizations():
    options = Options()

    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    # Setup Chrome driver using ChromeDriverManager
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        driver.get("https://maizepages.umich.edu/organizations")
        time.sleep(3)  # Initial load wait
        
        # First, load all clubs by clicking "Load More" until no more are available
        print("Loading all clubs...")
        while True:
            try:
                buttons = driver.find_elements(By.CSS_SELECTOR, "div[style*='height: 36px'][style*='border-radius: 2px']")
                load_more = None
                for button in buttons:
                    if "LOAD MORE" in button.text:
                        load_more = button
                        break
                
                if load_more:
                    driver.execute_script("arguments[0].click();", load_more)
                    time.sleep(0.25)  # Reduced wait time
                else:
                    print("All clubs loaded!")
                    break
                    
            except Exception as e:
                print("Finished loading clubs")
                break
        
        # Now scrape all clubs at once
        print("\nScraping all clubs...")
        cards = driver.find_elements(By.CSS_SELECTOR, "div[style*='padding: 15px 30px 11px 108px']")
        all_organizations = []
        
        for card in cards:
            try:
                name = card.find_element(By.CSS_SELECTOR, "div[style*='font-weight: 600']").text
                description = card.find_element(By.CSS_SELECTOR, "p[style*='color: rgba(0, 0, 0, 0.54)']").text
                image_url = card.find_element(By.TAG_NAME, "img").get_attribute("src")
                
                org_info = {
                    'name': name,
                    'description': description,
                    'image_url': image_url
                }
                
                all_organizations.append(org_info)
                print(f"Scraped: {name}")
                
            except Exception as e:
                print(f"Error processing card: {e}")
    
    finally:
        driver.quit()
    
    return all_organizations

if __name__ == "__main__":
    organizations = scrape_maize_pages_organizations()
    
    # Create directory if it doesn't exist
    os.makedirs('src/data', exist_ok=True)
    
    # Save to file
    with open('src/data/clubs.json', 'w', encoding='utf-8') as f:
        json.dump(organizations, f, indent=2, ensure_ascii=False)
    
    print(f"\nTotal organizations scraped: {len(organizations)}")