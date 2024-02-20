from utils import *
import streamlit as st

def app():
    # Set page title and icon
    st.set_page_config(page_title = "Bloomify", page_icon = "")
    
    # Load Bloomify logo
    bloomify_logo = "assets/logo.png"  # Replace with the actual path to your logo
    
    title_container = st.container()
    col1, col2 = st.columns([5,20])

    with title_container:
        with col1:
            st.image(bloomify_logo, width = 100)
        with col2:
            st.title("Bloomify")
    
    # Dropdown to select classification or suggestion
    option = st.selectbox("**Choose an option :** ", ("Classify", "Suggest"))

    if option == "Classify":
        # Text input for classification
        question = st.text_input("**Enter text for classification :**")
        
        # Classify button
        if st.button("Classify"):
            # Check if input is provided
            if question:
                # Call the classify_text function and display the result
                level = classify(question)
                st.success(f"The question level is {level}")
            else:
                st.warning("Please enter some text for classification")

    elif option == "Suggest":
        # Text input for suggestion
        question = st.text_input("**Enter text for suggestion : **")
        
        # Suggest button
        if st.button("Suggest"):
            # Check if input is provided
            if question:
                # Call the suggest_text function and display the result
                result = suggest(question)
                st.error(result)
            else:
                st.warning("Please enter text for suggestion")

if __name__ == '__main__':
    app()