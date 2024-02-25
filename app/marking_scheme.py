import streamlit as st

if "sppu_bachelor_of_engineering_aids" not in st.session_state:
    st.session_state["sppu_bachelor_of_engineering_aids"] = {
        "insem":
        {
            "total_marks": 30,
            "total_questions": 2,
            "optional_questions": 2,
            "marks_per_question": 15,
            "sub_questions": 3
        }
    }

