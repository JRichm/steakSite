"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

interface Item {
  name: string;
  description: string;
  price: number;
}

interface Category {
  category: string;
  items: Item[];
}

interface Menu {
  menu: Category[];
}

export default function Home() {
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('/menuData.json'); // file in the public directory
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  console.log('menuData');
  console.log(menuData);

  return (
    <main className="flex flex-col">
      <div className="flex flex-col">
        <p>this is the header</p>
        <span className="flex flex-row justify-evenly">
          <a href="">Menu</a>
          <a href="">Locations</a>
          <a href="">Reviews</a>
        </span>
      </div>
      <div>
        <div className="bg-blue-200 flex flex-col">
          <h1>Menu</h1>
          <hr />
          <div>
            {menuData.map((menu: Menu, index) => (
                <div key={index}>
                  {menu.menu.map((category: Category) => (
                    <div key={category.category}>
                      <h2>{category.category}</h2>
                      <div className="grid lg:grid-cols-2 md:grid-cols-1 m-12 gap-6">
                        {category.items.map((item: Item) => (
                          <div key={item.name} className="flex flex-col p-3 gap-1">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-xl font-bold">{item.name}</h3>
                              <p>{item.description}</p>
                            </div>
                            <div className="text-end italic">
                              <p>${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className="bg-red-200">
          <h1>Locations</h1>
        </div>
        <div className="bg-yellow-200">
          <h1>Reviews</h1>
        </div>
      </div>
    </main>
  );
}
