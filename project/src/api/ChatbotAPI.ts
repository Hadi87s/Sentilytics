export const fetchChatbotResponse = async (message: string): Promise<string> => {
    const url = "https://nlp-nlu.p.rapidapi.com/superstring/";
  
    const headers = {
      "x-rapidapi-key": "6ea1572dd1mshffb5e4068298a12p196754jsn92b8c0208260",
      "x-rapidapi-host": "nlp-nlu.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  
    const payload = `q=${encodeURIComponent(message)}&m=tokencount%2Ccomposition`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: payload,
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }
  
      const data = await response.json();
      return data?.response || "Sorry, I could not understand.";
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "An error occurred. Please try again.";
    }
  };
  