import 'dotenv/config'
import prisma from '@lib/client'

async function main() {
  // === 1️⃣ Departments ===
  await prisma.department.createMany({
    data: [
      { name: 'Market', slug: 'market' },
      { name: 'Clothes', slug: 'clothes' },
      { name: 'Beauty', slug: 'beauty' },
    ],
  })
  console.log('✅ Departments created')

  // === 2️⃣ Categories (hierarchical) ===
  const market = await prisma.department.findUnique({ where: { slug: 'slug' } })
  const clothes = await prisma.department.findUnique({
    where: { slug: 'clothes' },
  })
  const beauty = await prisma.department.findUnique({
    where: { slug: 'beauty' },
  })

  // Create parent categories first
  const categories = await prisma.category.createMany({
    data: [
      // MARKET
      {
        name: 'Bakery and Breakfast',
        slug: 'bakery-and-breakfast',
        departmentId: market!.id,
      },
      {
        name: 'Bread and Toasts',
        slug: 'bread-and-toasts',
        departmentId: market!.id,
      },
      {
        name: 'Toasts and Croutons',
        slug: 'toasts-and-croutons',
        departmentId: market!.id,
      },
      { name: 'Snacks', slug: 'snacks', departmentId: market!.id },
      { name: 'Drinks', slug: 'drinks', departmentId: market!.id },
      {
        name: 'Home Cleaning',
        slug: 'home-cleaning',
        departmentId: market!.id,
      },

      // CLOTHES
      { name: 'Men', slug: 'men', departmentId: clothes!.id },
      { name: 'Women', slug: 'women', departmentId: clothes!.id },
      { name: 'Accessories', slug: 'accessories', departmentId: clothes!.id },
      { name: 'Shoes', slug: 'shoes', departmentId: clothes!.id },

      // BEAUTY
      { name: 'Skin Care', slug: 'skin-care', departmentId: beauty!.id },
      { name: 'Hair Care', slug: 'hair-care', departmentId: beauty!.id },
      { name: 'Makeup', slug: 'makeup', departmentId: beauty!.id },
      { name: 'Perfumes', slug: 'perfumes', departmentId: beauty!.id },
      { name: 'Body Care', slug: 'body-care', departmentId: beauty!.id },
    ],
  })
  console.log('✅ Categories created')

  // Get all category IDs
  const categoriesData = await prisma.category.findMany()
  const findCategoryId = (slug: string) =>
    categoriesData.find((c) => c.slug === slug)?.id || 1

  // === 3️⃣ Products (10 per department) ===
  const products = [
    // 🏪 MARKET (10)
    {
      name: 'Club Social Original Crackers 288g',
      slug: 'club-social-original-crackers-288g',
      price: 8.9,
      description: 'Crispy salty crackers, perfect for breakfast or snacks.',
      imageUrl: '/images/market/club-social.jpg',
      imageAlt: 'Club Social crackers',
      stock: 100,
      categoryId: findCategoryId('toasts-and-croutons'),
    },
    {
      name: 'Whole Grain Sliced Bread 500g',
      slug: 'whole-grain-sliced-bread-500g',
      price: 7.5,
      description: 'Soft, fresh whole grain bread for daily use.',
      imageUrl: '/images/market/whole-bread.jpg',
      imageAlt: 'Whole grain bread',
      stock: 120,
      categoryId: findCategoryId('bread-and-toasts'),
    },
    {
      name: 'Seasoned Croutons 200g',
      slug: 'seasoned-croutons-200g',
      price: 6.9,
      description: 'Crunchy croutons, perfect for salads or soups.',
      imageUrl: '/images/market/croutons.jpg',
      imageAlt: 'Seasoned croutons',
      stock: 80,
      categoryId: findCategoryId('toasts-and-croutons'),
    },
    {
      name: 'Natural Orange Juice 1L',
      slug: 'natural-orange-juice-1l',
      price: 9.9,
      description: '100% natural orange juice with no added sugar.',
      imageUrl: '/images/market/orange-juice.jpg',
      imageAlt: 'Orange juice',
      stock: 200,
      categoryId: findCategoryId('drinks'),
    },
    {
      name: 'Cola Soda 2L',
      slug: 'cola-soda-2l',
      price: 8.5,
      description: 'Classic cola soda, perfect for sharing with friends.',
      imageUrl: '/images/market/cola-soda.jpg',
      imageAlt: 'Cola soda bottle',
      stock: 150,
      categoryId: findCategoryId('drinks'),
    },
    {
      name: 'Traditional Potato Chips 140g',
      slug: 'traditional-potato-chips-140g',
      price: 10.5,
      description: 'Crunchy potato chips with a classic salty taste.',
      imageUrl: '/images/market/potato-chips.jpg',
      imageAlt: 'Potato chips',
      stock: 110,
      categoryId: findCategoryId('snacks'),
    },
    {
      name: 'Roasted Peanuts 500g',
      slug: 'roasted-peanuts-500g',
      price: 12.9,
      description: 'Salted roasted peanuts, a perfect snack for any time.',
      imageUrl: '/images/market/roasted-peanuts.jpg',
      imageAlt: 'Roasted peanuts',
      stock: 100,
      categoryId: findCategoryId('snacks'),
    },
    {
      name: 'Neutral Liquid Detergent 3L',
      slug: 'neutral-liquid-detergent-3l',
      price: 18.9,
      description: 'Gentle detergent for home and laundry cleaning.',
      imageUrl: '/images/market/liquid-detergent.jpg',
      imageAlt: 'Neutral detergent',
      stock: 90,
      categoryId: findCategoryId('home-cleaning'),
    },
    {
      name: 'Floral Disinfectant 2L',
      slug: 'floral-disinfectant-2l',
      price: 15.9,
      description: 'Powerful floral-scented disinfectant for surfaces.',
      imageUrl: '/images/market/floral-disinfectant.jpg',
      imageAlt: 'Floral disinfectant bottle',
      stock: 60,
      categoryId: findCategoryId('home-cleaning'),
    },
    {
      name: 'Corn Breakfast Cereal 300g',
      slug: 'corn-breakfast-cereal-300g',
      price: 9.2,
      description: 'Corn cereal rich in vitamins for a healthy breakfast.',
      imageUrl: '/images/market/corn-cereal.jpg',
      imageAlt: 'Corn cereal box',
      stock: 130,
      categoryId: findCategoryId('bakery-and-breakfast'),
    },

    // 👕 CLOTHES (10)
    {
      name: 'Basic White T-Shirt',
      slug: 'basic-white-t-shirt',
      price: 39.9,
      description: 'Soft cotton t-shirt, classic and comfortable.',
      imageUrl: '/images/clothes/white-tshirt.jpg',
      imageAlt: 'Basic white t-shirt',
      stock: 70,
      categoryId: findCategoryId('men'),
    },
    {
      name: 'Slim Fit Jeans',
      slug: 'slim-fit-jeans',
      price: 149.9,
      description: 'Modern slim fit jeans, ideal for daily wear.',
      imageUrl: '/images/clothes/jeans.jpg',
      imageAlt: 'Slim fit jeans',
      stock: 50,
      categoryId: findCategoryId('men'),
    },
    {
      name: 'Floral Summer Dress',
      slug: 'floral-summer-dress',
      price: 179.9,
      description: 'Light and elegant dress perfect for summer days.',
      imageUrl: '/images/clothes/floral-dress.jpg',
      imageAlt: 'Floral dress',
      stock: 40,
      categoryId: findCategoryId('women'),
    },
    {
      name: 'Silk Blouse',
      slug: 'silk-blouse',
      price: 129.9,
      description: 'Elegant silk blouse for work or casual wear.',
      imageUrl: '/images/clothes/silk-blouse.jpg',
      imageAlt: 'Silk blouse',
      stock: 60,
      categoryId: findCategoryId('women'),
    },
    {
      name: 'Black Casual Cap',
      slug: 'black-casual-cap',
      price: 59.9,
      description: 'Black adjustable cap, great for everyday outfits.',
      imageUrl: '/images/clothes/black-cap.jpg',
      imageAlt: 'Black cap',
      stock: 80,
      categoryId: findCategoryId('accessories'),
    },
    {
      name: 'Brown Leather Belt',
      slug: 'brown-leather-belt',
      price: 89.9,
      description: 'Stylish brown leather belt with silver buckle.',
      imageUrl: '/images/clothes/leather-belt.jpg',
      imageAlt: 'Leather belt',
      stock: 45,
      categoryId: findCategoryId('accessories'),
    },
    {
      name: 'Running Sneakers',
      slug: 'running-sneakers',
      price: 199.9,
      description: 'Comfortable sneakers designed for running or gym.',
      imageUrl: '/images/clothes/running-shoes.jpg',
      imageAlt: 'Running sneakers',
      stock: 100,
      categoryId: findCategoryId('shoes'),
    },
    {
      name: 'Casual Women Sandals',
      slug: 'casual-women-sandals',
      price: 139.9,
      description: 'Soft and light sandals for everyday use.',
      imageUrl: '/images/clothes/women-sandals.jpg',
      imageAlt: 'Casual sandals',
      stock: 75,
      categoryId: findCategoryId('shoes'),
    },

    // 💄 BEAUTY (10)
    {
      name: 'Facial Moisturizing Cream 50ml',
      slug: 'facial-moisturizing-cream-50ml',
      price: 59.9,
      description: 'Hydrating face cream for soft, glowing skin.',
      imageUrl: '/images/beauty/facial-cream.jpg',
      imageAlt: 'Moisturizing cream',
      stock: 80,
      categoryId: findCategoryId('skin-care'),
    },
    {
      name: 'Nourishing Shampoo 400ml',
      slug: 'nourishing-shampoo-400ml',
      price: 34.9,
      description: 'Nourishing shampoo for smooth and shiny hair.',
      imageUrl: '/images/beauty/shampoo.jpg',
      imageAlt: 'Nourishing shampoo',
      stock: 90,
      categoryId: findCategoryId('hair-care'),
    },
    {
      name: 'Matte Red Lipstick',
      slug: 'matte-red-lipstick',
      price: 44.9,
      description: 'Intense red matte lipstick with long-lasting formula.',
      imageUrl: '/images/beauty/red-lipstick.jpg',
      imageAlt: 'Red matte lipstick',
      stock: 70,
      categoryId: findCategoryId('makeup'),
    },
    {
      name: 'Floral Perfume 100ml',
      slug: 'floral-perfume-100ml',
      price: 249.9,
      description: 'Elegant floral perfume with a soft lasting scent.',
      imageUrl: '/images/beauty/floral-perfume.jpg',
      imageAlt: 'Floral perfume bottle',
      stock: 50,
      categoryId: findCategoryId('perfumes'),
    },
    {
      name: 'Body Spray Deodorant',
      slug: 'body-spray-deodorant',
      price: 24.9,
      description: 'Fresh body spray for all-day protection.',
      imageUrl: '/images/beauty/body-spray.jpg',
      imageAlt: 'Body deodorant spray',
      stock: 120,
      categoryId: findCategoryId('body-care'),
    },
  ]

  await prisma.product.createMany({ data: products })
  console.log('✅ Products created')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
