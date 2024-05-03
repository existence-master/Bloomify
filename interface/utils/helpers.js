// Function to capitalize the first letter of each word in a string
const capitalizeWords = (str) => {
    return str.split(" ") // Split the string by spaces
              .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
              .join(" "); // Join the words back with spaces
};

// Function to convert an object into a string with key-value pairs formatted by newlines
const formatKeyValueString = (inputObject) => {
    const entries = Object.entries(inputObject);

    const formattedString = entries
        .map(([key, value]) => {
            // Replace underscores with spaces and capitalize each word's first letter
            const formattedKey = capitalizeWords(key.replace(/_/g, " ")); 
            return `${formattedKey}: ${value}`; // Return formatted key-value pair
        })
        .join("\n"); // Join pairs with newline

    return formattedString;
};

const renderWithLineBreaks = (text) => {
    // Split the text into an array of lines based on newline characters
    const lines = text.split("\n");
  
    return (
      <div>
        {lines.map((line, index) => (
          // Render each line in its own <div>, <p>, or <span> to maintain breaks
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  };

export { formatKeyValueString, renderWithLineBreaks };