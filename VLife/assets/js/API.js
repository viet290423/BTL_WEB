export async function GetAPI() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("False Get:", error);
    }
  }
  