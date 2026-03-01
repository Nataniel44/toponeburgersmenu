"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Burger } from '@/app/data';

interface CartItem extends Burger {
    cartItemId: string;
    quantity: number;
    selectedFlavors?: Burger[];
    flavorsExtraPrice?: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (burger: Burger, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (burger: Burger, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number) => {
        setCart(prev => {
            const flavorStr = selectedFlavors ? JSON.stringify(selectedFlavors.map(f => f.id)) : "";
            const existing = prev.find(item => item.id === burger.id && (item.selectedFlavors ? JSON.stringify(item.selectedFlavors.map(f => f.id)) : "") === flavorStr);
            if (existing) {
                return prev.map(item =>
                    item.cartItemId === existing.cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...burger, cartItemId: Math.random().toString(36).substring(7), quantity, selectedFlavors, flavorsExtraPrice }];
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.cartItemId === cartItemId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + ((item.price + (item.flavorsExtraPrice || 0)) * item.quantity), 0);

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
