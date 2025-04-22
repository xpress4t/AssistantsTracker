export const getCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "101",
          studentIds: [4],
          subjects: [{ subjectId: 1, teacherId: 2 }],
        },
        {
          id: 2,
          name: "102",
          studentIds: [4, 5],
          subjects: [{ subjectId: 2, teacherId: 3 }],
        },
      ]);
    }, 200);
  });
};

export const createCourse = async (course) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(course);
    }, 200);
  });
};

export const editCourse = async (course) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(course);
    }, 200);
  });
};

export const deleteCourse = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};
