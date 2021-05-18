import './App.css';
import React, { useEffect, useReducer } from 'react';
import {
	studentReducer,
	ACTIONS,
	initialState,
} from './Reducer/studentReducer';

import {
	MainContainer,
	ListContainer,
	Input,
	StudentList,
	StudentContainer,
	StudentDataContainer,
	StudentH1,
	StudentImg,
	StudentGradeList,
	ToggleButton,
	StudentInfo,
	Tags,
	TagsContainer,
} from './components/App.Elemetns';

const calculateAverage = (student) => {
	return (
		student.grades.reduce((a, b) => parseInt(b) + a, 0) /
		student.grades.map((grade) => grade).length
	);
};

function App() {
	const [state, dispatch] = useReducer(studentReducer, initialState);

	useEffect(() => {
		fetch('https://www.hatchways.io/api/assessment/students')
			.then((res) => res.json())
			.then(
				(res) => {
					res.students.map((student) => (student.tags = []));

					dispatch({ type: ACTIONS.setLoading, payload: true });
					dispatch({ type: ACTIONS.setStudents, payload: res.students });
				},
				(error) => {
					dispatch({ type: ACTIONS.setLoading, payload: true });
					dispatch({ type: ACTIONS.setError, payload: error });
				},
			);
	}, []);

	useEffect(() => {
		dispatch({
			type: ACTIONS.setFilteredStudents,
			payload: state.students.filter((student) => {
				return (
					student.firstName.toLowerCase().includes(state.search.toLowerCase()) ||
					student.lastName.toLowerCase().includes(state.search.toLowerCase())
				);
			}),
		});
	}, [state.search, state.students]);

	useEffect(() => {
		dispatch({
			type: ACTIONS.setFilteredStudents,
			payload: filterByTag(),
		});
	}, [state.tags]);

	const toggleButton = (id) => {
		if (state.toggle.includes(id)) {
			dispatch({
				type: ACTIONS.setToggle,
				payload: state.toggle.filter((studentId) => studentId !== id),
			});
		} else {
			dispatch({
				type: ACTIONS.setToggle,
				payload: [...state.toggle, id],
			});
		}
	};

	const addTag = (e, i) => {
		e.preventDefault();
		if (e.target.tag.value.trim() !== '') {
			dispatch({
				type: ACTIONS.addTag,
				payload: { value: e.target.tag.value, id: i },
			});
		}
	};

	const filterByTag = (tag) => {
		let newarr = [];
		for (let i = 0; i < state.students.length; i++) {
			for (let j = 0; j <= state.tags.length; j++) {
				if (state.students[i].tags.join('').includes(state.tags[j])) {
					console.log('matched');
					newarr.push(state.students[i]);
				}
			}
		}
		return newarr;
	};

	if (state.error) {
		return <div>Error Message : {state.error.message}</div>;
	} else if (!state.isLoaded) {
		return <div>Page Loading...</div>;
	} else {
		return (
			<MainContainer>
				<ListContainer>
					<Input
						type="text"
						placeholder="Search by name"
						onChange={(e) => dispatch({ type: ACTIONS.setSearch, payload: e.target.value })}
					/>
					<Input
						type="text"
						placeholder="Search by tag"
						onChange={(e) => dispatch({ type: ACTIONS.setTag, payload: e.target.value })}
					/>

					{state.filteredStudents.map((student, i) => (
						<StudentList key={student.id}>
							<StudentImg src={student.pic} alt="student" />
							<StudentContainer>
								<StudentH1>
									{student.firstName} {student.lastName}
								</StudentH1>
								<StudentDataContainer>
									<StudentInfo>Email: {student.email}</StudentInfo>
									<StudentInfo>Company: {student.company}</StudentInfo>
									<StudentInfo>Skill: {student.skill}</StudentInfo>
									<StudentInfo>Average : {calculateAverage(student)} %</StudentInfo>

									{state.toggle.includes(student.id) ? (
										<StudentGradeList>
											{student.grades.map((grade, index) => (
												<li key={index}>
													Test {index + 1}: {grade}%
												</li>
											))}
										</StudentGradeList>
									) : null}
									<TagsContainer>
										{student.tags.length > 0
											? student.tags.map((tag, i) => {
													return <Tags key={i}>{tag}</Tags>;
											  })
											: null}
									</TagsContainer>
									<form id={student.id} onSubmit={(e) => addTag(e, student.id - 1)}>
										<Input form={student.id} name="tag" type="text" placeholder="Add a tag" />
									</form>
								</StudentDataContainer>
							</StudentContainer>

							<ToggleButton
								onClick={() => {
									toggleButton(student.id);
								}}
							>
								{state.toggle.includes(student.id) ? '-' : '+'}
							</ToggleButton>
						</StudentList>
					))}
				</ListContainer>
			</MainContainer>
		);
	}
}

export default App;
