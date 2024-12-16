import pickle
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import langdetect
import time

def save_cookies(driver, filepath):
    """Save cookies to a file after signing in manually."""
    with open(filepath, "wb") as file:
        pickle.dump(driver.get_cookies(), file)

def load_cookies(driver, filepath):
    """Load cookies from a file."""
    with open(filepath, "rb") as file:
        cookies = pickle.load(file)
        for cookie in cookies:
            driver.add_cookie(cookie)

def scrape_reviews_and_product_name(url):
    """
    Scrapes product name and reviews dynamically from Amazon.
    """
    driver = webdriver.Edge()
    cookies_path = "amazon_cookies.pkl"
    all_reviews = []
    product_name = None

    try:
        # Step 1: Load Amazon
        driver.get("https://www.amazon.com/")
        time.sleep(5)

        # Step 2: Load cookies
        try:
            load_cookies(driver, cookies_path)
            driver.refresh()
        except FileNotFoundError:
            input("Log in manually, then press Enter...")
            save_cookies(driver, cookies_path)

        # Step 3: Navigate to product URL
        driver.get(url)
        time.sleep(5)

        # Step 4: Extract product name
        soup = BeautifulSoup(driver.page_source, "html.parser")
        try:
            # Attempt multiple selectors to find product title
            product_name = None
            possible_selectors = ["#productTitle", "span.a-size-large", "h1 span", "div[data-asin-title]"]

            for selector in possible_selectors:
                element = soup.select_one(selector)
                if element:
                    product_name = element.get_text(strip=True)
                    break

            if not product_name:
                print("DEBUG: Product title not found. Printing page source...")
                print(driver.page_source[:5000])
                product_name = "Unknown Product"

        except Exception as e:
            print(f"Error while extracting product name: {e}")
            product_name = "Unknown Product"

        # Step 5: Extract reviews
        while True:
            soup = BeautifulSoup(driver.page_source, "html.parser")
            review_boxes = soup.select("div[data-hook='review']")
            if not review_boxes:
                break

            for box in review_boxes:
                try:
                    review_text = box.select_one("span[data-hook='review-body']").text.strip()
                    if not review_text or len(review_text) < 10:
                        continue
                    if langdetect.detect(review_text) != "en":
                        continue
                    all_reviews.append({"text": review_text})
                except AttributeError:
                    continue

            # Step 6: Go to next page
            try:
                next_button = driver.find_element(By.CSS_SELECTOR, "li.a-last a")
                next_button.click()
                time.sleep(5)
            except:
                break

    finally:
        driver.quit()

    return {"product_name": product_name, "reviews": all_reviews}
