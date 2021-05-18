export const ACTIONS = {
	setError: 'setError',
	setLoading: 'setLoading',
	setStudents: 'setStudents',
	setSearch: 'setSearch',
	setFilteredStudents: 'setFilteredStudents',
	setToggle: 'setToggle',
	setTag: 'setTag',
};
export const initialState = {
	error: null,
	isLoaded: false,
	students: [],
	search: '',
	filteredStudents: [],
	tags: [],
	toggle: [],
};

export const studentReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.setError:
			return {
				...state,
				error: action.payload,
			};

		case ACTIONS.setLoading:
			return {
				...state,
				isLoaded: action.payload,
			};

		case ACTIONS.setStudents:
			return { ...state, students: [...state.students, ...action.payload] };

		case ACTIONS.setSearch:
			return { ...state, search: action.payload };

		case ACTIONS.setFilteredStudents:
			return {
				...state,
				filteredStudents: action.payload,
			};

		case ACTIONS.addTag:
			let newStudentData = [...state.students];
			newStudentData[action.payload.id].tags.push(action.payload.value);

			return { ...state, students: newStudentData };

		case ACTIONS.setTag:
			return {
				...state,
				tags: [action.payload],
			};

		case ACTIONS.setToggle:
			return {
				...state,
				toggle: [...action.payload],
			};
		default:
			return state;
	}
};
