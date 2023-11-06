import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const createRandomAttendance = (studentId, courseId) => {
  const monthlyAttendedInt = faker.number.int({ min: 0, max: 25 });
  return {
    student: studentId,
    course: courseId,
    monthlyAttended: monthlyAttendedInt,
    monthlyOccured: faker.number.int({ min: 25, max: 27 }),
    cumulativeAttended:
      monthlyAttendedInt + faker.number.int({ min: 0, max: 150 }),
    cumulativeOccured:
      monthlyAttendedInt + faker.number.int({ min: 150, max: 175 }),
  };
};

const generateAttendance = (studentCourseList) => {
  const attendance = [];
  for (let i = 0, j = 0; i < studentCourseList.length; j += 1) {
    attendance.push(
      createRandomAttendance(
        studentCourseList[i].studentId,
        studentCourseList[i].coursesOpted[j],
      ),
    );
    if (j >= 6) {
      i += 1;
      j = 0;
    }
  }
  return attendance;
};

export default generateAttendance;
