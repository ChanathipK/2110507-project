export default async function getHotels() {
    const response = await fetch("http://localhost:5000/api/v1/hotels");
    if (response.status !== 200) {
        throw new Error("Failed to fetch hotels.");
    }

    return await response.json();
}