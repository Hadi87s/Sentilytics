import pickle
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
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

        possible_selectors = [

            "#productTitle",  # Primary selector

            "span.a-size-large.product-title-word-break",  # Secondary fallback

            "h1 span",  # Header title fallback

            "div[data-asin-title]"  # Fallback for asin title

        ]



        for selector in possible_selectors:

            element = soup.select_one(selector)

            if element:

                product_name = element.get_text(strip=True)

                break



        # Last resort: Try fetching from the <title> tag

        if not product_name:

            title_element = soup.find("title")

            if title_element:

                product_name = title_element.get_text(strip=True).split("|")[0].strip()

            else:

                product_name = "Unknown Product"

            print("DEBUG: Product title not found using selectors.")



        # Step 5: Extract reviews

        while True:

            soup = BeautifulSoup(driver.page_source, "html.parser")

            review_boxes = soup.select("span[data-hook='review-body']")



            if not review_boxes:

                break



            for box in review_boxes:

                try:

                    review_text = box.get_text(strip=True)

                    if not review_text or len(review_text) < 10:

                        continue

                    if langdetect.detect(review_text) != "en":

                        continue

                    all_reviews.append({"text": review_text})

                except Exception as e:

                    print(f"DEBUG: Error extracting review text: {e}")

                    continue



            # Step 6: Go to the next page
            try:
                next_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "li.a-last a"))
                )
                if not next_button.is_displayed() or not next_button.is_enabled():
                    print("DEBUG: 'Next' button is not clickable. Exiting pagination.")
                    break
                next_button.click()
                time.sleep(5)
            except TimeoutException:
                print("DEBUG: No 'Next' button found. Pagination ended.")
                break
            except Exception as e:
                print(f"DEBUG: Error during pagination: {e}")
                break

    finally:
        driver.quit()
    return {"product_name": product_name, "reviews": all_reviews}
