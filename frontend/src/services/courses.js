export const getCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "101",
          studentIds: [2],
          subjectIds: [],
        },
        {
          id: 2,
          name: "102",
          studentIds: [3, 4],
          subjectIds: [],
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
