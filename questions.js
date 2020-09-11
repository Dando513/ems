const mainQuestions = {
    name: "questions", 
    type: "list", 
    message: "What would you like to manage?", 
    choices: [
        "Manage Employees", 
        "Manage Roles", 
        "Manage Departments", 
        "Exit"
    ]
}	

const employeeQuestions = {
    name: "employees",	    
    type: "list",	   
    message: "Manage Employees?",	  
    choices: [	   
        "View All Employees",	       
        "Add Employee",	        
        "Remove Employee",	       
        "Update Employee Role",	       
        "Update Employee Manager",	        
        "Return"	        
    ]	    
	}

    const deptQuestions = {
        name: "departments",	   
        type: "list",	    
        message: "Manage Department",	    
        choices: [	    
            "View Departments",	        
            "Add Departments",	        
            "Remove Departments",	        
            "Update Department Name",	        
            "Return"	        
        ]	    
    }	
    
    const roleQuestions = {
        name: "role",	    
        type: "list",	   
        message: "Manage Roles",	    
        choices: [	   
            "View All Roles",	       
            "Add Role",	      
            "Remove Role",	        
            "Update Role Title",	      
            "Update Role Salary",	       
            "Return"	        
        ]	    
    }	

    const newEmployeeQuestions = [
        {	    
            name: "firstName",	       
            type: "input",	       
            message: "First name?"	       
        },	   
        {	    
            name: "lastName",	    
            type: "input",	       
            message: "Last name?"	        
        }	    
    ]	

    const newDeptQuestions = [
        {	    
            name: "dept",	        
            type: "input",	       
            message: "What is the name of the new department?"	       
        	    }
    ]	

    const newRoleQuestions = [
        {	    
            name: "title",	        
            type: "input",	     
            message: "What is the title for the new role?"	       
        },	    
        {	    
            name: "salary",	       
            type: "input",	        
            message: "What is the salary for the new role??"	       
        }	    
    ]	


     




module.exports = {
    mainQuestions: mainQuestions,	   
    employeeQuestions: employeeQuestions,	   
    deptQuestions: deptQuestions,	
    roleQuestions: roleQuestions, 	      
    newDeptQuestions: newDeptQuestions,	    
    newRoleQuestions: newRoleQuestions,	    
    newEmployeeQuestions: newEmployeeQuestions	    
};