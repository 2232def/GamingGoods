export const fetchOwner = async () => {
    try {
      const res = await fetch("http://localhost:8080/owners/profile", {
        credentials: "include",
      });
  
      if (!res.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${errorData.message} (status: ${res.status})`);
      }
  
      const data = await response.json();
      return data.owner;
    } catch (err) {
      console.error("Error fetching owner:", err);
      throw err;
    }
  };