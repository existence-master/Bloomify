from utils import *
import streamlit as st

if "current_level" not in st.session_state:
    st.session_state["current_level"] = None

def set_current_level():
    st.session_state["current_level"] = None


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
        with st.form("classify_form", clear_on_submit = False, border = False):

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

    elif option == "Suggest":

        # Text input for suggestion
        question = st.text_input("**Enter question for suggestion :**", on_change = set_current_level)

        if question and st.session_state["current_level"] == None:
            level = classify(question)
            st.session_state["current_level"] = level
        
        st.markdown(f"The current level is :blue[{st.session_state['current_level']}]")

        with st.form("suggest_form", clear_on_submit = False, border = False):

            # Text input for syllabus
            syllabus = st.text_area("**Enter syllabus :**")
            
            # Dropdown for Bloom's taxonomy levels
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

if __name__ == "__main__":
    app()