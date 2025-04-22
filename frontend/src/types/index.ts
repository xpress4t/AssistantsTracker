interface User {
    id: number;
    name: string;
    lastname: string;
    photo: string;
    email: string;
}

interface Student extends User {
    role: 'student';
}

interface Teacher extends User {
    role: 'teacher';
}

interface Subject {
    id: number;
    name: string;
}

interface SubjectWithTeacher extends Subject {
    subjectId: number;
    teacherId: number;
}

interface Course {
    id: number;
    name: string;
    studentIds: number[];
    subjects: SubjectWithTeacher[];
}

