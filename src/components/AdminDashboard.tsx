import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Truck, 
  Database, 
  FileCode, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    artisans,
    setCurrentRole,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'catalog' | 'orders' | 'schema'>('analytics');
  
  // New Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProd, setNewProd] = useState<Partial<Product>>({
    title: '',
    sindhiName: '',
    subtitle: '',
    category: 'Ajrak',
    pricePKR: 15000,
    artisanTown: 'Bhit Shah',
    technique: 'Natural Veg-dye (Teli)',
    baseMaterial: 'Pure Mulberry Silk',
    intendedUse: 'Apparel / Chaddar',
    isOneOfAKind: true,
    stockQuantity: 5,
    isNaturalDyeCertified: true,
    description: '',
    provenanceDetails: '',
    numberOfStages: 14,
    dyeIngredients: ['Wild Indigo', 'Madder Root', 'Tamarind Seed'],
    dimensions: {
      lengthInches: 100,
      widthInches: 50,
      lengthCm: 254,
      widthCm: 127,
      weightGrams: 420,
      categoryScaleType: 'shawl'
    }
  });

  // Calculate Real-Time Metrics
  const totalGMVPKR = orders.reduce((sum, o) => sum + o.totalPKR, 0);
  const averageOrderValuePKR = orders.length > 0 ? Math.round(totalGMVPKR / orders.length) : 0;
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 3);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.title) return;

    addProduct({
      title: newProd.title || 'Untitled Heirloom Piece',
      sindhiName: newProd.sindhiName || 'دستڪاري',
      subtitle: newProd.subtitle || 'Handcrafted in Sindh',
      category: newProd.category as any,
      pricePKR: Number(newProd.pricePKR) || 12000,
      artisanId: artisans[0].id,
      artisanTown: newProd.artisanTown as any,
      technique: newProd.technique as any,
      baseMaterial: newProd.baseMaterial as any,
      intendedUse: newProd.intendedUse as any,
      isOneOfAKind: Boolean(newProd.isOneOfAKind),
      stockQuantity: Number(newProd.stockQuantity) || 3,
      inStock: true,
      isNaturalDyeCertified: Boolean(newProd.isNaturalDyeCertified),
      dyeIngredients: newProd.dyeIngredients || ['Wild Indigo', 'Madder Root'],
      numberOfStages: Number(newProd.numberOfStages) || 14,
      dimensions: newProd.dimensions as any,
      mainImage: products[0].mainImage,
      secondaryImage: products[0].secondaryImage,
      detailImage: products[0].detailImage,
      description: newProd.description || 'Authentic handcrafted piece preserving ancient traditions.',
      provenanceDetails: newProd.provenanceDetails || 'Direct from guild cooperative workshop.',
      careInstructions: ['Dry clean or cold hand wash with natural soap', 'Dry in shade'],
      reviews: [],
      rating: 5.0,
      reviewCount: 0,
      tags: [newProd.category || 'Craft', newProd.artisanTown || 'Sindh']
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-[#FAF8F5] py-8 border-b border-[#E6DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Console Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40] animate-pulse" />
              <span className="text-[11px] font-mono text-[#7A6F68] uppercase tracking-wider">
                Dastkari Sindh Guild Console · Role: Administrator
              </span>
            </div>
            <h2 className="font-serif-heading text-2xl font-bold text-[#201D1C] mt-0.5">
              Cooperative Operations & Catalog Management
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRole('buyer')}
              className="px-3.5 py-1.5 text-xs font-medium text-[#4A433F] hover:text-[#201D1C] bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded-md transition-colors cursor-pointer"
            >
              Exit to Buyer View
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Textile SKU</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E6DECE] bg-[#F1EAE0] rounded-lg p-1 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analytics' ? 'bg-white text-[#9C4127] shadow-xs' : 'text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>GMV & Guild Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'catalog' ? 'bg-white text-[#9C4127] shadow-xs' : 'text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders' ? 'bg-white text-[#9C4127] shadow-xs' : 'text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order State Machine ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'schema' ? 'bg-white text-[#9C4127] shadow-xs' : 'text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Schema & API Contracts</span>
          </button>
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs">
                <span className="text-[11px] font-mono text-[#7A6F68] uppercase">Total GMV (Cooperative)</span>
                <p className="font-mono text-2xl font-bold text-[#201D1C] mt-1 tabular-nums">
                  {formatPrice(totalGMVPKR)}
                </p>
                <span className="text-[11px] text-[#2E6F40] font-semibold mt-1 block">
                  ↑ 24.8% vs last month
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs">
                <span className="text-[11px] font-mono text-[#7A6F68] uppercase">Average Order Value (AOV)</span>
                <p className="font-mono text-2xl font-bold text-[#201D1C] mt-1 tabular-nums">
                  {formatPrice(averageOrderValuePKR)}
                </p>
                <span className="text-[11px] text-[#7A6F68] mt-1 block">
                  High-ticket heirloom textiles
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs">
                <span className="text-[11px] font-mono text-[#7A6F68] uppercase">Cart Abandonment Rate</span>
                <p className="font-mono text-2xl font-bold text-[#2E6F40] mt-1 tabular-nums">
                  18.4%
                </p>
                <span className="text-[11px] text-[#2E6F40] mt-1 block">
                  Well below 70% e-commerce avg
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs">
                <span className="text-[11px] font-mono text-[#7A6F68] uppercase">Low Stock Alerts</span>
                <p className="font-mono text-2xl font-bold text-[#872323] mt-1 tabular-nums">
                  {lowStockProducts.length} Items
                </p>
                <span className="text-[11px] text-[#872323] mt-1 block">
                  Requires artisan re-dyeing
                </span>
              </div>
            </div>

            {/* Category Breakdown & Guild Payouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-xl border border-[#E0D7C6] space-y-4">
                <h4 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                  Volume Breakdown by Craft Tradition
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-medium text-[#201D1C] mb-1">
                      <span>14-Stage Teli Ajrak (Bhit Shah / Matiari)</span>
                      <span className="font-mono">54%</span>
                    </div>
                    <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#9C4127] h-full rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-[#201D1C] mb-1">
                      <span>Tuk Rilli Quilts (Tharparkar)</span>
                      <span className="font-mono">31%</span>
                    </div>
                    <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1B2B4C] h-full rounded-full" style={{ width: '31%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-[#201D1C] mb-1">
                      <span>Cobalt Hala Kashi Pottery</span>
                      <span className="font-mono">15%</span>
                    </div>
                    <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#C59B4D] h-full rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E0D7C6] space-y-4">
                <h4 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                  Artisan Guild Direct Payout Ledger
                </h4>
                <div className="divide-y divide-[#F0EBE1] text-xs">
                  {artisans.map((art) => (
                    <div key={art.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#201D1C] block">{art.name}</span>
                        <span className="text-[11px] text-[#7A6F68]">{art.town} Guild · {art.cooperativeSharePercentage}% Share</span>
                      </div>
                      <span className="text-[11px] font-mono bg-[#2E6F40]/10 text-[#2E6F40] px-2 py-0.5 rounded font-semibold">
                        Payouts Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-xl border border-[#E0D7C6] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E6DECE] flex items-center justify-between bg-[#FAF8F5]">
              <span className="text-xs font-bold text-[#201D1C] uppercase tracking-wider">
                Live SKUs in Dastkari Storefront
              </span>
              <span className="text-xs text-[#7A6F68]">
                Changes persist instantly to localStorage
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E6DECE] bg-[#F1EAE0] text-[#7A6F68] font-mono text-[11px]">
                    <th className="py-3 px-4">Textile & Provenance</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Origin Town</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.mainImage} alt={p.title} className="w-10 h-10 object-cover rounded border border-[#E6DECE]" />
                          <div>
                            <span className="font-bold text-[#201D1C] block">{p.title}</span>
                            <span className="text-[11px] text-[#7A6F68]">{p.technique}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#201D1C]">{p.category}</td>
                      <td className="py-3 px-4 text-[#7A6F68]">{p.artisanTown}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#201D1C]">{formatPrice(p.pricePKR)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono">
                          <button
                            onClick={() => updateProduct(p.id, { stockQuantity: Math.max(0, p.stockQuantity - 1) })}
                            className="w-5 h-5 bg-[#F1EAE0] rounded text-center leading-none text-xs hover:bg-[#E8DFC9] cursor-pointer"
                          >
                            -
                          </button>
                          <span className={`px-1.5 font-bold ${p.stockQuantity <= 2 ? 'text-[#872323]' : 'text-[#201D1C]'}`}>
                            {p.stockQuantity}
                          </span>
                          <button
                            onClick={() => updateProduct(p.id, { stockQuantity: p.stockQuantity + 1 })}
                            className="w-5 h-5 bg-[#F1EAE0] rounded text-center leading-none text-xs hover:bg-[#E8DFC9] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-[#998E87] hover:text-[#872323] cursor-pointer rounded hover:bg-[#FAF3E8]"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT & STATE MACHINE */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-[#E0D7C6] overflow-hidden shadow-xs space-y-4 p-5">
            <h4 className="font-serif-heading text-lg font-bold text-[#201D1C]">
              Order State Machine & Courier AWB Management
            </h4>
            
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-xl border border-[#E4DDD0] bg-[#FAF8F5] space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DECE] pb-2.5">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#201D1C]">Order #{ord.id}</span>
                      <p className="text-[11px] text-[#7A6F68] mt-0.5">
                        Customer: <strong className="text-[#201D1C]">{ord.customerName}</strong> ({ord.customerEmail}, {ord.customerPhone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#9C4127]">{formatPrice(ord.totalPKR)}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#D8CFBE] font-mono text-[11px]">
                        AWB: {ord.trackingNumber}
                      </span>
                    </div>
                  </div>

                  {/* Order Status Stepper Selector */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-[#554D47] mr-1">Advance Status:</span>
                    {(['Pending', 'Processing', 'Awaiting Courier Pickup', 'In Transit', 'Delivered'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(ord.id, st, `${st} at Sindh Hub`, `Status transitioned to ${st}`)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          ord.status === st
                            ? 'bg-[#9C4127] text-white font-semibold'
                            : 'bg-white border border-[#D8CFBE] text-[#554D47] hover:bg-[#F1EAE0]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Latest tracking location */}
                  <div className="text-[11px] text-[#7A6F68] flex items-center gap-1.5 pt-1">
                    <Truck className="w-3.5 h-3.5 text-[#9C4127]" />
                    <span>Courier: <strong>{ord.courier}</strong> · Destination: {ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE SCHEMA & API CONTRACTS (REQUIREMENT 8) */}
        {activeTab === 'schema' && (
          <div className="bg-white rounded-xl border border-[#E0D7C6] p-6 space-y-6">
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                Relational Architecture & API Contracts
              </h3>
              <p className="text-xs text-[#7A6F68] mt-1">
                PostgreSQL schema definition (Drizzle / Prisma ORM) and RESTful API endpoints for the Dastkari Sindh platform.
              </p>
            </div>

            {/* Prisma Schema Code Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#201D1C] uppercase font-mono flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#9C4127]" />
                <span>1. schema.prisma (Relational PostgreSQL Data Model)</span>
              </span>
              <pre className="p-4 bg-[#201D1C] text-[#E8DFD3] rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#352F2D]">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  BUYER
  ADMIN
  ARTISAN
}

enum OrderStatus {
  PENDING
  PROCESSING
  AWAITING_COURIER_PICKUP
  IN_TRANSIT
  DELIVERED
  CANCELLED
}

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  phone         String?   @unique
  role          Role      @default(BUYER)
  orders        Order[]
  addresses     Address[]
  reviews       Review[]
  createdAt     DateTime  @default(now())
}

model Artisan {
  id              String    @id @default(uuid())
  name            String
  honorific       String
  town            String    // Bhit Shah, Hala, Matiari, Tharparkar
  generationCount Int
  craftSpecialty  String
  bio             String
  coopSharePct    Int       @default(70) // >= 70% direct to artisan
  products        Product[]
  createdAt       DateTime  @default(now())
}

model Product {
  id                    String        @id @default(uuid())
  title                 String
  sindhiName            String
  category              String        // Ajrak, Rilli, Kashi
  pricePKR              Int
  technique             String
  baseMaterial          String
  isOneOfAKind          Boolean       @default(false)
  stockQuantity         Int           @default(1)
  isNaturalDyeCertified Boolean       @default(true)
  artisanId             String
  artisan               Artisan       @relation(fields: [artisanId], references: [id])
  orderItems            OrderItem[]
  reviews               Review[]
  createdAt             DateTime      @default(now())
}

model Order {
  id             String        @id @default(uuid())
  userId         String?
  user           User?         @relation(fields: [userId], references: [id])
  customerName   String
  customerEmail  String
  customerPhone  String
  courier        String        // TCS, Leopards, DHL
  trackingNumber String        @unique
  status         OrderStatus   @default(PENDING)
  totalPKR       Int
  currencyPaid   String        @default("PKR")
  paymentMethod  String        // JazzCash, EasyPaisa, Stripe, COD
  items          OrderItem[]
  createdAt      DateTime      @default(now())
}`}
              </pre>
            </div>

            {/* REST API Endpoints Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#201D1C] uppercase font-mono flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#1B2B4C]" />
                <span>2. RESTful API Contracts & Endpoints</span>
              </span>

              <div className="overflow-x-auto border border-[#E6DECE] rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F1EAE0] font-mono text-[11px] text-[#7A6F68]">
                    <tr>
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3">Endpoint</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Auth Guard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1] font-mono text-[11px]">
                    <tr>
                      <td className="py-2 px-3 text-[#2E6F40] font-bold">GET</td>
                      <td className="py-2 px-3">/api/v1/products</td>
                      <td className="py-2 px-3 font-sans text-xs">Filter by town, technique, category, natural dye</td>
                      <td className="py-2 px-3 text-[#7A6F68]">Public</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-[#1B2B4C] font-bold">POST</td>
                      <td className="py-2 px-3">/api/v1/auth/phone/otp</td>
                      <td className="py-2 px-3 font-sans text-xs">Dispatch 6-digit SMS verification code</td>
                      <td className="py-2 px-3 text-[#7A6F68]">Rate-Limited (3/hr)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-[#1B2B4C] font-bold">POST</td>
                      <td className="py-2 px-3">/api/v1/checkout/reserve</td>
                      <td className="py-2 px-3 font-sans text-xs">Hold 1-of-1 piece with 10-minute Redis lock</td>
                      <td className="py-2 px-3 text-[#7A6F68]">Session Token</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-[#1B2B4C] font-bold">POST</td>
                      <td className="py-2 px-3">/api/v1/orders</td>
                      <td className="py-2 px-3 font-sans text-xs">Create order & generate courier AWB</td>
                      <td className="py-2 px-3 text-[#7A6F68]">Session Token</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-[#9C4127] font-bold">PATCH</td>
                      <td className="py-2 px-3">/api/v1/admin/orders/:id/status</td>
                      <td className="py-2 px-3 font-sans text-xs">Advance order state machine & inject tracking steps</td>
                      <td className="py-2 px-3 text-[#9C4127] font-bold">ADMIN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-70 bg-black/65 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E6DECE] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">Add New Artisanal SKU</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#7A6F68] hover:text-[#201D1C] cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#4A433F] font-medium mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  placeholder="e.g. Asmani Indigo Silk Ajrak Chaddar"
                  className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="Ajrak">Ajrak</option>
                    <option value="Rilli">Rilli</option>
                    <option value="Kashi Pottery">Kashi Pottery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Origin Town</label>
                  <select
                    value={newProd.artisanTown}
                    onChange={(e) => setNewProd({ ...newProd, artisanTown: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="Bhit Shah">Bhit Shah</option>
                    <option value="Hala">Hala</option>
                    <option value="Matiari">Matiari</option>
                    <option value="Tharparkar">Tharparkar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newProd.pricePKR}
                    onChange={(e) => setNewProd({ ...newProd, pricePKR: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProd.stockQuantity}
                    onChange={(e) => setNewProd({ ...newProd, stockQuantity: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#554D47] hover:bg-[#F1EAE0] rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md cursor-pointer"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
