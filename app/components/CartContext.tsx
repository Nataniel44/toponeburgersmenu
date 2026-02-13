"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Burger } from '@/app/data';

interface CartItem extends Burger {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (burger: Burger, quantity: number) => void;
    removeFromCart: (burgerId: string) => void;
    updateQuantity: (burgerId: string, delta: number) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (burger: Burger, quantity: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === burger.id);
            if (existing) {
                return prev.map(item =>
                    item.id === burger.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...burger, quantity }];
        });
    };

    const removeFromCart = (burgerId: string) => {
        setCart(prev => prev.filter(item => item.id !== burgerId));
    };

    const updateQuantity = (burgerId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === burgerId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCartOpen,
            setIsCartOpen,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
