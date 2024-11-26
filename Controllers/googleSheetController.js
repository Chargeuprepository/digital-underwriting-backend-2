export default async function googleSheetController() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwqu30W5SUWTUCUYFHbCmqkRG_zcrMD3iHqMF_LZEZIcYbU_UxQoGWKr1FpkvyPGuVrNA/exec"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
