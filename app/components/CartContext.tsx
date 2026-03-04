"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Burger } from '@/app/data';

export interface CartItem extends Burger {
    cartItemId: string;
    quantity: number;
    selectedFlavors?: Burger[];
    flavorsExtraPrice?: number;
    excludedIngredients?: string[];
    customIngredients?: string[];
    customMeats?: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (burger: Burger, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number, excludedIngredients?: string[], customIngredients?: string[], customMeats?: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    updateCartItem: (cartItemId: string, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number, excludedIngredients?: string[], customIngredients?: string[], customMeats?: number) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    editingItem: CartItem | null;
    setEditingItem: (item: CartItem | null) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CartItem | null>(null);

    const addToCart = (burger: Burger, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number, excludedIngredients?: string[], customIngredients?: string[], customMeats?: number) => {
        setCart(prev => {
            const flavorStr = selectedFlavors ? JSON.stringify(selectedFlavors.map(f => f.id)) : "";
            const exIngStr = excludedIngredients ? JSON.stringify(excludedIngredients.slice().sort()) : "";
            const customIngStr = customIngredients ? JSON.stringify(customIngredients.slice().sort()) : "";
            const existing = prev.find(item =>
                item.id === burger.id &&
                (item.selectedFlavors ? JSON.stringify(item.selectedFlavors.map(f => f.id)) : "") === flavorStr &&
                (item.excludedIngredients ? JSON.stringify(item.excludedIngredients.slice().sort()) : "") === exIngStr &&
                (item.customIngredients ? JSON.stringify(item.customIngredients.slice().sort()) : "") === customIngStr &&
                (item.customMeats || 1) === (customMeats || 1)
            );
            if (existing) {
                return prev.map(item =>
                    item.cartItemId === existing.cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...burger, cartItemId: Math.random().toString(36).substring(7), quantity, selectedFlavors, flavorsExtraPrice, excludedIngredients, customIngredients, customMeats }];
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

    const updateCartItem = (cartItemId: string, quantity: number, selectedFlavors?: Burger[], flavorsExtraPrice?: number, excludedIngredients?: string[], customIngredients?: string[], customMeats?: number) => {
        setCart(prev => prev.map(item => {
            if (item.cartItemId === cartItemId) {
                return { ...item, quantity, selectedFlavors, flavorsExtraPrice, excludedIngredients, customIngredients, customMeats };
            }
            return item;
        }));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => {
        let price = item.price;
        if (item.flavorsExtraPrice) price += item.flavorsExtraPrice;
        if (item.id === "custom" && item.customMeats === 2) price += 1500;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            updateCartItem,
            isCartOpen,
            setIsCartOpen,
            editingItem,
            setEditingItem,
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
