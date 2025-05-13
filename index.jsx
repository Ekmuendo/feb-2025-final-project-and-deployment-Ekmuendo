import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Wireless Headphones', price: 50, image: '/images/headphones.jpg' },
    { id: 2, name: 'Smart Watch', price: 120, image: '/images/smartwatch.jpg' },
    { id: 3, name: 'Bluetooth Speaker', price: 40, image: '/images/speaker.jpg' },
    { id: 4, name: 'VR Headset', price: 250, image: '/images/vr.jpg' }
];

function Navbar() {
    return (
        <nav className='p-4 bg-blue-600 text-white flex justify-between'>
            <h1 className='text-xl font-bold'>My E-commerce Store</h1>
            <div className='space-x-4'>
                <Link to='/' className='hover:text-gray-200'>Home</Link>
                <Link to='/products' className='hover:text-gray-200'>Products</Link>
                <Link to='/cart' className='hover:text-gray-200'>Cart</Link>
                <Link to='/checkout' className='hover:text-gray-200'>Checkout</Link>
            </div>
        </nav>
    );
}

function Home() {
    return (
        <div className='p-6'>
            <h2 className='text-2xl'>Welcome to My E-commerce Store</h2>
            <p className='mt-4'>Find the best gadgets and accessories right here!</p>
        </div>
    );
}

function Products({ addToCart }) {
    return (
        <div className='p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
                <Card key={product.id} className='p-4'>
                    <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-lg' />
                    <CardContent>
                        <h3 className='text-xl font-semibold'>{product.name}</h3>
                        <p className='text-gray-500'>${product.price}</p>
                        <Button className='mt-2 w-full' onClick={() => addToCart(product)}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function Cart({ cart, removeFromCart }) {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold'>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className='text-gray-500'>Your cart is empty.</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className='p-2 border-b flex justify-between'>
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                        <Button variant='destructive' onClick={() => removeFromCart(index)}>
                            Remove
                        </Button>
                    </div>
                ))
            )}
        </div>
    );
}

function Checkout() {
    return (
        <div className='p-6'>
            <h2 className='text-2xl'>Checkout Page</h2>
            <p className='mt-4'>This feature is coming soon. Stay tuned!</p>
        </div>
    );
}

export default function EcommerceApp() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products addToCart={addToCart} />} />
                <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
        </Router>
    );
}

