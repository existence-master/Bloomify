# Import required modules and functions
from utils import *
import streamlit as st

# Check if "current_level" is not already in the session state, and initialize it to None
if "current_level" not in st.session_state:
    st.session_state["current_level"] = None

# Function to reset the current level in the session state
def set_current_level():
    st.session_state["current_level"] = None

# Main application function
def app():
    # Set page title and icon
    st.set_page_config(page_title="Bloomify", page_icon="")

    # Load Bloomify logo (replace with the actual path to your logo)
    bloomify_logo = "assets/logo.png"

    # Create a container for the title with two columns
    title_container = st.container()
    col1, col2 = st.columns([5, 20])

    with title_container:
        with col1:
            # Display Bloomify logo
            st.image(bloomify_logo, width=100)
        with col2:
            # Display Bloomify title
            st.title("Bloomify")

    # Dropdown to select classification or suggestion
    option = st.selectbox("**Choose an option :** ", ("Classify", "Suggest"))

    # Classification option
    if option == "Classify":
        with st.form("classify_form", clear_on_submit=False, border=False):

            # Text input for classification
            question = st.text_input("**Enter text for classification :**")

            # Classify button
            if st.form_submit_button("Classify"):
                # Check if input is provided
                if question:
                    try:
                        # Call the classify_text function and display the result
                        level = classify(question)
                        st.success(f"The question level is {level}")
                    except Exception as e:
                        st.error(f"An error occurred: {e}")
                else:
                    st.warning("Please enter some text for classification")

    # Suggestion option
    elif option == "Suggest":

        # Text input for suggestion
        question = st.text_input("**Enter question for suggestion :**", on_change=set_current_level)

        # Automatically classify the question if it's provided and current_level is not set
        if question and st.session_state["current_level"] is None:
            level = classify(question)
            st.session_state["current_level"] = level

        # Display the current level
        st.markdown(f"The current level is :blue[{st.session_state['current_level']}]")

        with st.form("suggest_form", clear_on_submit=False, border=False):

            # Text input for syllabus
            syllabus = st.text_area("**Enter syllabus :**")

            # Dropdown for Bloom's taxonomy levels excluding the current level
            all_levels = ("Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create")
            other_levels = tuple(element for element in all_levels if element != st.session_state["current_level"])
            selected_level = st.selectbox("**Choose the taxonomy level into which you want to transform :**", other_levels)

            # Suggest button
            if st.form_submit_button("Suggest"):
                # Check if inputs are provided
                if syllabus and selected_level and question:
                    try:
                        # Call the suggest function with syllabus, Bloom's level, and question, and display the result
                        transformed_question = suggest(syllabus, selected_level, question)
                        st.success(f"The transformed question with level {selected_level} is:  \n  \n{transformed_question}")
                    except Exception as e:
                        st.error(f"An error occurred: {e}")
                else:
                    st.warning("Please enter all required information for suggestion")

# Run the app if the script is executed directly
if __name__ == "__main__":
    app()