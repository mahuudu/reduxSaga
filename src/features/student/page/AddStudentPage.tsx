import React , {useEffect, useState} from 'react';
import { Student } from './../../../models/student';
import StudentApi from './../../../api/studentApi';
import { boolean } from 'yup';
import { StudentForm } from '../components/StudentForm';
import { toast } from 'react-toastify';


export interface AddStudentPageProps {
  studentData : Student;
  isEdit : Boolean;
}

export function AddStudentPage ({studentData,isEdit}: AddStudentPageProps) {
  
  const { _id: studentId} = studentData;

  const [student,setStudent] = useState<Student>();

  useEffect(() => {
    if(!studentId) return;
    (async () => {
        try {
            const {data  : Student} = await StudentApi.getById(studentId);
            setStudent(Student);
        } catch (error) {
          console.log('err when fetch', error);
        }
    })();
  }, [studentId]);

  const initialValues : Student = {
    name : '',
    age : '',
    mark : '',
    gender : 'male',
    city : '',
    ...student,
  } as Student;

  const handleSubmitStudent = async(formValues:Student) => {

      if(isEdit){
          console.log('Formvalue', formValues);
          return await StudentApi.update(formValues);
      }else{
          return await StudentApi.add(formValues);
      }
  }

  return (
    <>
        {(!isEdit || Boolean(student)) && (
          <StudentForm initialValues={initialValues} onSubmit={handleSubmitStudent}></StudentForm>
        )}
    </>
  );
}
