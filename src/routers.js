import Course        from "./components/course/Course";
import Company        from "./components/company/Company";
import Lecturer       from "./components/lecturer/Lecturer";
import Intern         from "./components/intern/Intern";
import Registration   from "./components/registration/Registration";
import Areas          from "./components/company/area/Areas";
import Council        from "./components/council/Council";
import CourseList     from "./components/Guest/CourseList";
import CompanyList    from "./components/Guest/CompanyList";
import CompanyEditor  from "./components/company/CompanyEditor";
import CreateLecturer from "./components/lecturer/CreateLecturer";
import CreateIntern   from "./components/intern/CreateIntern";

export default [
    {
        path       : '/management/areas',
        component  : Areas,
        name       : 'Area management',
        permissions: ['lecturer']
    }, {
        path       : '/management/intern',
        component  : CreateIntern,
        name       : 'Create intern',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/create/lecturer',
        component  : CreateLecturer,
        name       : 'Create Lecturer',
        permissions: ['admin']
    },
    {
        path       : '/edit/company/:id',
        component  : CompanyEditor,
        name       : 'Company Edit',
        permissions: ['admin', 'lecturer']
    },
        {
        path       : '/course-list',
        component  : Course,
        name       : 'Course List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/company-list',
        component  : Company,
        name       : 'Company List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/lecturer-list',
        component  : Lecturer,
        name       : 'Lecturer List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/intern-list',
        component  : Intern,
        name       : 'Intern List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/registration-list',
        component  : Registration,
        name       : 'Registration List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/area-list',
        component  : Areas,
        name       : 'Area List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/council-list',
        component  : Council,
        name       : 'Council List',
        permissions: ['admin', 'lecturer']
    },{
        path       : '/courses',
        component  : CourseList,
        name       : 'Courses',
        permissions: ['intern']
    },{
        path       : '/companies',
        component  : CompanyList,
        name       : 'Companies',
        permissions: ['intern']
    }
];
