import React, {useState, useEffect, useContext} from 'react';


// react-bootstrap components
import {Container, Row, Col} from 'react-bootstrap';
// import AdminView from './../components/AdminView';
import UserView from './../components/UserView';
import UserContext from './../UserContext';
// components
// import Product from './../components/Product'; //itong Course is how it will be displayed

export default function Products(){

	const [products, setProducts] = useState([])
	const {user} = useContext(UserContext);

	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://bookish-mnl.herokuapp.com/api/products/all',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result, "result from product")
			setProducts(result)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<Container className="p-4"  id="product-wall" fluid>
			{ (user.isAdmin === true) ?
					{/*<AdminView courseData={products} fetchData={fetchData}/>*/}
				:
				
					<UserView productData={products} />

			}
		</Container>
	)

}