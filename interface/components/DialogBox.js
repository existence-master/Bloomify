"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertToMessage } from "@utils/helpers";

const DialogBox = ({ mode = "classification" , reloadChat, chatDetails, university}) => {
	
	const { data: session } = useSession()
	const [isOpen, setIsOpen] = useState(false);
	const [units, setUnits] = useState([{ unit: 1, content: '' }]);
	const [markingScheme, setMarkingScheme] = useState({
		marks_per_unit: 0,
		main_questions_per_unit: 0,
		sub_questions_per_main_question: 0,
		marks_per_main_question: 0,
	});

	const { chatId, chatFilters } = chatDetails


	// Default state initialization based on the mode
	const initialQueryState = {
		classification: {
			question: ""
		},
		suggestion: {
			question: "",
			desired_level: ""
		},
		generation: {
			university: university,
			degree: chatFilters.degree,
			branch: chatFilters.branch,
			year: chatFilters.year,
			subject: chatFilters.subject,
			syllabus: [{ unit: 1, content: "" }],
			marking_scheme: {
				marks_per_unit: 0,
				main_questions_per_unit: 0,
				sub_questions_per_main_question: 0,
				marks_per_main_question: 0
			},
			average_blooms_score: 3
		},
	};

	const [query, setQuery] = useState(initialQueryState[mode] || {});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	// Conditional url
	const url = mode === "classification"
		? "http://localhost:5000/classify"
		: mode === "suggestion"
			? "http://localhost:5000/suggest"
			: mode === "generation"
				? "http://localhost:5000/generate"
				: "" 

	// Function to add a new unit to the syllabus
	const addUnit = () => {
		setUnits((prevUnits) => [...prevUnits, { unit: prevUnits.length + 1, content: '' }]);
	};

	// Function to handle changes in the unit inputs
	const handleUnitChange = (index, event) => {
		const updatedUnits = [...units];
		updatedUnits[index].content = event.target.value;
		setUnits(updatedUnits);
	};
	
	const openDialog = () => {
		setIsOpen(true);
	};
	
	const handleMarkingSchemeChange = (e) => {
		const { name, value } = e.target;
		console.log("Change event:", name, value);
		setMarkingScheme((prevState) => ({
			...prevState,
			[name]: parseInt(value), // Ensure the value is an integer
		}));
	};

	const handleInput = (e) => {
		const { name, value } = e.target; // Get the name and value of the input field
			setQuery((prevState) => ({
				...prevState,
				[name]: value, // Dynamically update the property based on the name
			}));
	};

	const handleFormInput = (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Collect form data
		const formData = new FormData(e.target);
		const formName = e.target.name
		let formDetails = null

		if (formName === "marking_scheme") {
			// Create an object to store the marking scheme data
			formDetails = {}

			for (const [key, value] of formData.entries()) {
				formDetails[key] = value
				};
		}

		else if (formName === "syllabus") {
			formDetails = []
			for (const [key, value] of formData.entries()) {
				formDetails.push({
					unit: parseInt(key),
					content: value
				});
		}
		}
	
		setQuery((prevState) => ({
			...prevState,
			[formName]: formDetails, // Dynamically update the property based on the name
		}));
	}

	console.log(query)

	const closeDialog = () => {
		setIsOpen(false);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsLoading(true);

		const requestData = convertToMessage(query);
		console.log(requestData)
		try {

			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
				body: JSON.stringify(query), // Send user input in the specified format
			});

			if (!response.ok) {
				throw new Error("Failed to send query");
			}

			const responseData = await response.text();

			response = await fetch("/api/update-chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					chatId,
					requestData,
					responseData,
					mode
				}), // Send user input in the specified format
			});

			if (!response.ok) {
				throw new Error("Failed to update chat");
			}

			reloadChat()
		}

		catch (error) {
			console.log(error);
		}

		finally {
			setIsLoading(false);
			closeDialog();
		}
	};

	// Can declare like this instead of return
	const classificationForm = (
		<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:flex-col sm:items-start">
			<h3 className="text-lg leading-6 font-medium text-gray-900">
				Enter your question
			</h3>
			<input
				type="text"
				name = "question"
				value={query.question}
				onChange={handleInput}
				className="mt-2 w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
			/>
		</div>
	);

	const suggestionForm = (
		<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:flex-col sm:items-start">
			<h3 className="text-lg leading-6 font-medium text-gray-900">
				Question:
			</h3>
			<input
				type="text"
				name="question"
				value={query.question}
				onChange={handleInput}
				className="mb-3 w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
			/>
			<h3 className="text-lg leading-6 font-medium text-gray-900">
				Desired Level:
			</h3>
				<input
					type="text"
					name="desired_level"
					value={query.desired_level}
					onChange={handleInput}
					className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
				/>
		</div>
	);

	// Varad, create separate forms for syllabus and marking scheme input in generationForm
	const generationForm = (
		<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:flex-col sm:items-start">
			<form name="syllabus" onSubmit={handleFormInput}>
			<h3>Syllabus</h3>
			{units.map((unit, index) => (
				<div key={index} className="syllabus-unit">
					<label>{`Unit ${unit.unit}`}</label>
					<input
						type="text"
						name={unit.unit}
						value={unit.content}
						onChange={(e) => handleUnitChange(index, e)}
						className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				</div>
			))}
			<button type="button" onClick={addUnit} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md">
				Add Unit
			</button>
			{/* Submit button to submit the form */}
			<button type="submit" className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md">
				Submit Syllabus
			</button>
			</form>
			<form name="marking_scheme" onSubmit={handleFormInput}>
			<h3>Marking Scheme</h3>
			<div className="flex flex-col gap-2">
				<label>
						Marks Per Unit
				</label>
					<input
						type="number"
						name="marks_per_unit"
						value={markingScheme.marks_per_unit}
						onChange={handleMarkingSchemeChange}
						className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				<label>
					Main Questions Per Unit
				</label>

				<input
					type="number"
					name="main_questions_per_unit"
					value={markingScheme.main_questions_per_unit}
					onChange={handleMarkingSchemeChange}
					className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
				/>
				<label>
						Sub-Questions Per Main Question
				</label>
					<input
						type="number"
						name="sub_questions_per_main_question"
						value={markingScheme.sub_questions_per_main_question}
						onChange={handleMarkingSchemeChange}
						className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				<label>
						Marks Per Main Question
				</label>
					<input
						type="number"
						name="marks_per_main_question"
						value={markingScheme.marks_per_main_question}
						onChange={handleMarkingSchemeChange}
						className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				</div>
				<button type="submit" className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md">
					Submit Marking Scheme
				</button>
		</form>
		</div>
	);

	return (
		<div className="flex justify-center items-center">
			<button
				onClick={openDialog}
				className="bg-transparent"
			>
			{mode === "classification" && (
				<Image
					src="/classifyicon.svg"
					alt="Classify Icon"
					className="w-8 h-8 mx-auto my-2 cursor-pointer"
					width={8}
					height={8}
				/>
			)}
			{mode === "suggestion" && (
				<Image
					src="/suggesticon.svg"
					alt="Suggest Icon"
					className="w-8 h-8 mx-auto my-2 cursor-pointer"
					width={8}
					height={8}
				/>
			)}
			{mode === "generation" && (
				<Image
					src="/generateicon.svg"
					alt="Generate Icon"
					className="w-8 h-8 mx-auto my-2 cursor-pointer"
					width={8}
					height={8}
				/>
			)}
			</button>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							{mode === "classification"  // Conditional rendering according to mode
								? classificationForm
								: mode === "suggestion"
									? suggestionForm
									: mode === "generation"
										? generationForm
										: ""
							} 
							
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
									onClick={sendMessage}
									disabled={isLoading}
									className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
										isLoading ? "cursor-not-allowed opacity-50" : ""
									}`}
								>
									{isLoading ? "Processing..." : "Send"}
								</button>
								<button
									onClick={closeDialog}
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DialogBox;