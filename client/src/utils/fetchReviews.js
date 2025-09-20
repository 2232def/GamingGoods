export const fetchReviews = async (setReviews) => {
    try {
        const res = await fetch(
            "http://localhost:8080/reviews/product/:productId",
            {
                credentials: "include",
            }
        );
        if (!res.ok) {
            const errorRes = await res.json();
            console.error("Error fetching reviews:", errorRes);
            return;
        }
        const data = await res.json();
        setReviews(data);
        console.log("Reviews fetched:", data);

    } catch (error) {
        console.error("Error fetching reviews:", error);
    }

}