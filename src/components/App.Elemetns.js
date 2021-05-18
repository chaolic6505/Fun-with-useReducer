import styled from 'styled-components';

const Color = {
	Primary: 'lightgray',
	Second: '#000',
};

export const MainContainer = styled.div`
	background-color: rgb(247, 243, 243);
`;

export const ListContainer = styled.ul`
	list-style-type: none;
	border: 1px solid ${Color.Primary};
	border-radius: 10px;
	height: 50%;
	margin: 5% 20%;
	overflow-x: hidden;
	background-color: #fff;
	padding: 0;
	margin-bottom: 1%;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const StudentContainer = styled.div`
	height: 100%;
	padding-left: 1%;
`;

export const StudentDataContainer = styled.div`
	width: 100%;
	padding: 3%;
`;
export const StudentImg = styled.img`
	width: 20%;
	height: 20%;
	border: 1px solid ${Color.Primary};
	border-radius: 50%;
	margin: 5%;
`;

export const StudentH1 = styled.h1`
	margin: 1% 0 0 0;
	font-size: 200%;
`;

export const StudentList = styled.li`
	border-bottom: 0.1px solid ${Color.Primary};
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	position: relative;
`;

export const StudentGradeList = styled.ul`
	list-style-type: none;
	padding-left: 0;
	margin: 1%;
	color: gray;
`;

export const StudentInfo = styled.p`
	list-style-type: none;
	padding-left: 0;
	margin: 1%;
	color: gray;
`;

export const Input = styled.input`
	width: 90%;
	border: none;
	font-size: 100%;
	border-bottom: 1px solid ${Color.Primary};
	padding: 1%;
	margin: 2%;
	&:focus {
		outline: none;
		border-bottom: 2px solid ${Color.Second};
	}
`;

export const Tags = styled.div`
	display: block;
	text-align: center;
	justify-content: center;
	width: auto;
	height: 10%;
	border: none;
	font-size: 90%;
	padding: 1% 2%;
	margin: 2%;
	background-color: ${Color.Primary};
`;
export const TagsContainer = styled.div`
	display: flex;
`;

export const ToggleButton = styled.button`
	border: none;
	background-color: #fff;
	font-size: 250%;
	color: ${Color.Primary};
	position: absolute;
	top: 0;
	right: 1%;

	&:hover {
		color: ${Color.Second};
	}
`;
