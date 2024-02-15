# Bloomify

A modern question paper setting AI agent based on Bloom's taxonomy

## What Is Bloom’s Taxonomy?

Bloom's Taxonomy is a hierarchical framework used to classify educational objectives and learning outcomes based on cognitive complexity. Developed by educational psychologist Benjamin Bloom and his colleagues in 1956, the taxonomy categorizes cognitive skills into six levels, arranged in ascending order of complexity:

1. **Knowledge (Remember):** This foundational level involves recalling information and facts. Learners at this stage demonstrate knowledge by recognizing, listing, and describing essential elements.
2. **Comprehension (Understand):** Goes beyond mere recall. Learners understand the meaning of information, explain ideas, summarize concepts, and interpret information in their own words.
3. **Application (Apply):** Involves using knowledge in practical situations. Learners at this stage can apply what they have learned to solve problems, execute procedures, and implement concepts in real-world scenarios.
4. **Analysis (Analyze):** Moving into higher-order thinking, analysis requires breaking down information into its components. Learners can identify patterns, relationships, and structures within the content, demonstrating a deeper understanding.
5. **Evaluation (Evaluate):** Involves making judgments about the value or effectiveness of information, methods, or solutions. Learners at this level can assess, critique, and justify their opinions based on specific criteria.
6. **Synthesis (Create):** At the pinnacle, involves combining knowledge and skills to generate new ideas, products, or solutions. Learners can design, compose, and invent based on their comprehensive understanding.

Bloom's Taxonomy provides educators with a framework to design educational objectives and assessments that target various levels of cognitive skills. It promotes a holistic approach to learning, encouraging the development of critical thinking, problem-solving, and creativity. The taxonomy is widely used in curriculum development, instructional design, and assessment practices across various educational levels and disciplines.

## The Problem

There are three main problems addressed:

1. **Exams Dominated by Lower Levels:** Many educational institutions predominantly set exam questions at the lower levels of Bloom's Taxonomy, restricting students to rote memorization and recall. This practice hinders holistic learning experiences, discouraging critical thinking and practical application.

   - **Current Drawbacks:**
     - Rote Learning Dominance
     - Inhibition Of Critical Thinking
     - Lack Of Practical Application
     - Diminished Problem-Solving Skills
     - Stagnation Of Creativity
     - Misalignment With Real-World Demands
     - Limited Focus On Higher-Order Skills

2. **Manual Challenges in Balanced Papers:** Some universities follow Bloom’s taxonomy for both syllabi and papers, but creating balanced papers manually involves challenges. Calculating Bloom’s score for each paper, marking schemes, and balancing levels require significant manual work.

3. **Non-Alignment with Bloom’s Taxonomy:** Some universities do not follow Bloom’s taxonomy, leading to low clarity regarding student development and academics. Others using different taxonomies may not achieve the same results as Bloom’s.

## The Solution

The proposed solution is a chatbot designed to revolutionize the assessment process in educational institutions. It includes the following key features:

1. **Classification:** Accurate classification of academic questions into specific levels of Bloom's taxonomy, providing a nuanced understanding of cognitive complexity.
2. **Suggestion:** Capability to suggest diverse ways of representing questions at different cognitive levels, empowering educators to design assessments that encourage critical thinking and practical application.
3. **Generation:** Ability to generate entire question papers by providing details like degree, branch, year, subject, and exam mode (Insem/Endsem/Unit Test for SPPU).
4. **User-Friendly Interface:** A key design element ensuring seamless integration into the assessment creation process, making the chatbot practical and accessible for educators.

**Resources for Visualization:**

- [Designs](https://www.figma.com/file/Fdse68FQCX0phhGjqC4V1t/Bloomify?type=design&node-id=0%3A1&mode=design&t=K8RRjuxKmWcPTNi7-1)
- [Prototype](https://www.figma.com/proto/Fdse68FQCX0phhGjqC4V1t/Bloomify?page-id=0%3A1&type=design&node-id=1-63&viewport=141%2C335%2C0.13&t=USLg2zLv94kT1wtX-1&scaling=scale-down&starting-point-node-id=1%3A63&show-proto-sidebar=1&mode=design)
- [Flow Diagram](https://www.figma.com/file/MuEqYu3SXNl9gePIa9ml1T/Bloomify?type=whiteboard&node-id=0%3A1&t=AIndCYpS6GoYhD0C-1)
- [Sample Prompts & Answers](https://docs.google.com/document/d/1jAzaLs9wlfR2xooXSUO2T6gJprsC9xQTl012WNRq3cc/view?usp=sharing)

## Criteria

Comparison with Existence's project selection criteria:

1. **Alignment With Holistic Philosophy:**
   - The project contributes to the holistic development of individuals across diverse educational levels, aligning with Bloom's Taxonomy.
2. **Open Source Compatibility:**
   - The chatbot project can be developed as an open-source solution, encouraging transparency and collaboration.
3. **Monetization Feasibility:**
   - The project has potential for monetization within educational institutions, tutoring services, or as a supplementary tool for educators.
4. **Impact:**
   - The impact of the Bloom's Taxonomy project is significant, with potential for substantial global impact.

## Roadmap

1. Create a dataset of SPPU questions for all 4 years and all branches.
2. Use any working model to classify the question, focusing on classification only.
3. Build a UI around the basic model to create a platform that classifies SPPU questions.
4. Work on LLM fine-tuning for the suggestions feature.
5. Update the UI to accommodate the suggestions feature.
6. Build a stable application for SPPU.
7. Scale for other universities.

## Contributors

Thanks goes to these wonderful people:
</br>

<table>
  <tr>
     <td align="center">
         <a href="https://github.com/itsskofficial"><img src="https://avatars.githubusercontent.com/u/65887545?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
               <b>
                  Sarthak Karandikar
               </b>
            </sub>
         </a>
         <br />
            🧑🏻‍💼💻
      </td>
      <td align="center">
         <a href="https://github.com/Kabeer2004"><img src="https://avatars.githubusercontent.com/u/59280736?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
               <b>
                  Kabeer Ahmed Merchant
               </b>
            </sub>
         </a>
         <br />
            🧑🏻‍💼💻
      </td>
      <td align="center">
         <a href="https://github.com/abhijeetsuryawanshi12"><img src="https://avatars.githubusercontent.com/u/108229267?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
               <b>
                  Abhijeet Suryawanshi
               </b>
            </sub>
         </a>
         <br />
            💻
      </td>
      <td align="center">
         <a href="https://github.com/ojaswini1410"><img src="https://avatars.githubusercontent.com/u/113436626?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
               <b>
                  Ojaswini Prabhune
               </b>
            </sub>
         </a>
         <br />
            🎨
      </td>
   
  </tr>
</table>

## License

Distributed under the GNU-GPL License. See [LICENSE](LICENSE.md) for more information.

## Code of Conduct

Please review our [Code Of Conduct](CODE_OF_CONDUCT.md) to maintain a rightful atmosphere in the club

## Contributing

Contributions are welcome! Check our [Contributing Guide](CONTRIBUTING.md) to start contributing to Bloomify
