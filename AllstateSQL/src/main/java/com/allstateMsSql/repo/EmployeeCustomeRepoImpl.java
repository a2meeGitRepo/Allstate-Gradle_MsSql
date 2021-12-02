package com.allstateMsSql.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.allstateMsSql.model.Employee;



public class EmployeeCustomeRepoImpl implements EmployeeCustomeRepo {
	@PersistenceContext
	EntityManager entityManager;
	@Override
	public List<Employee> getEmployeeByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub

		long result = (long) entityManager.createQuery("SELECT count(e) FROM Employee e").getSingleResult();
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Employee e ", Employee.class);
		int firstR = total_count - (page_no * item_per_page);
		int maxR = total_count - ((page_no - 1) * item_per_page);
		

		if(firstR<0) {
			firstR=0;
		}
	
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Employee> list = q.getResultList();
		return list;
	}

	@Override
	public List<Employee> getEmployeeByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(e) FROM Employee e where  e.employeeName LIKE :searchText OR  e.employeeNo LIKE :searchText OR e.email LIKE :searchText OR e.mobileNo LIKE :searchText OR e.uhfCode LIKE :searchText").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Employee e where    e.employeeName LIKE :searchText OR  e.employeeNo LIKE :searchText OR e.email LIKE :searchText OR e.mobileNo LIKE :searchText OR e.uhfCode LIKE :searchText", Employee.class);
		int firstR = total_count - (pageNo * perPage);
		int maxR = total_count - ((pageNo - 1) * perPage);
		

		if(firstR<0) {
			firstR=0;
		}
		q.setParameter("searchText", "%"+searchText+"%");
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Employee> list = q.getResultList();
		return list;
	}

	@Override
	public int getEmployeeCount() {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(e) FROM Employee e").getSingleResult();

		return (int) result;
	}

	@Override
	public int getEmployeeCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(e) FROM Employee e where  e.employeeName LIKE :searchText OR  e.employeeNo LIKE :searchText OR e.email LIKE :searchText OR e.mobileNo LIKE :searchText OR e.uhfCode LIKE :searchText").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		return (int) result;
	}

}
