import streamlit as st

# Initialize the session state variable with default values for the specified paper type
st.session_state["sppu_bachelor_of_engineering_aids"] = {
    "insem": {
        "total_marks": 30,
        "total_questions": 2,
        "optional_questions": 2,
        "marks_per_question": 15,
        "sub_questions": 3
    }
}