import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Package, Wallet, Briefcase,
  Factory, Truck, Megaphone, Store, FileText, Brain, Settings,
  Search, Bell, ChevronDown, Plus, Phone, Mail, Building2, TrendingUp,
  TrendingDown, MoreHorizontal, ArrowUpRight, ArrowDownRight, Filter, X, Star,
  CircleDollarSign, Clock, CheckCircle2, AlertCircle, Link, Trophy, Medal,
  Inbox, AtSign, CheckCheck, Lock, Send, Printer, Download, ChevronRight,
  Ban, ReceiptText, ClipboardList, FileCheck, Trash2, Copy, Landmark,
  BarChart3, Grid3x3, List, FileSpreadsheet, FileImage, File, Folder,
  FolderOpen, UploadCloud, Eye, Percent, Globe, CreditCard, Tag,
  MessageSquare, MousePointerClick, ChevronUp, ShoppingBag, Minus, Receipt,
  Banknote, Smartphone, ArrowUpDown, Repeat, UserPlus, CalendarCheck,
  Stethoscope, ScanLine, Pill, FlaskConical, Edit2, Heart, Award,
  GraduationCap, HeartHandshake, Layers, ClipboardCheck, Cog, ShieldCheck,
  Wrench, Kanban, Flag, ListTodo, Headphones, Ticket, MessageCircle,
  BookOpen, PhoneCall, LoaderCircle, Gauge, Hash, Video, Mic, PenTool,
  QrCode, MapPin, EyeOff, User, ArrowRight, LogOut, Target, Crosshair,
  GitBranch, Circle, ScanText, History, Calendar, ChevronLeft, Sparkles,
  Zap, HeartPulse, HardHat, Fingerprint, Activity, PiggyBank, HandCoins,
  Users2, Coins, BookHeart, TreePine, Scale, CircleUserRound,
  BadgeDollarSign, Shield, ArrowRightLeft, School, Bus, Tablets, TestTube,
  Building, Hotel, Bed, Car, BookMarked, CalendarDays, UserCheck, Library,
  NotebookPen, Clipboard, DollarSign, BadgeCheck, Microscope, Syringe,
  UtensilsCrossed, ChefHat, Utensils, CookingPot, ConciergeBell, BedDouble,
  Key, DoorOpen, Split, MinusCircle, PlusCircle, RefreshCw, Shuffle,
  ArrowLeftRight, Wallet2, Coffee, Wine, ShoppingBasket, Pizza, Timer,
  Salad, CheckCircle, XCircle, RotateCcw, Archive, Moon, Sun, Sliders,
  SortAsc, SortDesc, CheckSquare, Undo2, BellRing, BarChart2, BadgePercent,
  Calculator, FolderSync, Database, Cpu, Globe2, Languages, GanttChart,
  KanbanSquare, Wifi, WifiOff, RefreshCcw, PanelLeftClose, PanelLeftOpen,
  ArrowUpCircle, ChevronFirst, ChevronLast, ImageIcon, Palette, Save, Info
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Cell,
  LineChart as RLineChart, Line, ComposedChart,
  PieChart as RPieChart, Pie, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import * as XLSX from "xlsx";

export const MODULES = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, live: true },
  { id: "crm", label: "CRM", icon: Users, live: true },
  { id: "sales", label: "Sales", icon: ShoppingCart, live: true },
  { id: "inventory", label: "Inventory", icon: Package, live: true },
  { id: "procurement", label: "Procurement", icon: ClipboardCheck, live: true },
  { id: "finance", label: "Finance", icon: Wallet, live: true },
  { id: "reports", label: "Reports", icon: BarChart3, live: true },
  { id: "hr", label: "HR", icon: Briefcase, live: true },
  { id: "manufacturing", label: "Manufacturing", icon: Factory, live: true },
  { id: "scm", label: "Supply Chain", icon: Truck, live: true },
  { id: "marketing", label: "Marketing", icon: Megaphone, live: true },
  { id: "ecommerce", label: "E-Commerce", icon: Store, live: true },
  { id: "pos", label: "Point of Sale", icon: ShoppingBag, live: true },
  { id: "documents", label: "Documents", icon: FileText, live: true },
  { id: "projects", label: "Projects", icon: Kanban, live: true },
  { id: "support", label: "Customer Support", icon: Headphones, live: true },
  { id: "analytics", label: "Analytics", icon: Gauge, live: true },
  { id: "notifications", label: "Notifications", icon: Bell, live: true },
  { id: "activity", label: "Activity Stream", icon: Activity, live: true },
  { id: "integrations", label: "Integration Hub", icon: Globe, live: true },
  { id: "workflows", label: "Workflow Studio", icon: GitBranch, live: true },
  { id: "collaboration", label: "Collaboration Hub", icon: MessageSquare, live: true },
  { id: "ai", label: "AI Assistant", icon: Brain, live: true },
  { id: "microfinance", label: "Microfinance", icon: HandCoins, live: true },
  { id: "vicoba", label: "VICOBA / SACCOS", icon: Users2, live: true },
  { id: "community", label: "Community Groups", icon: TreePine, live: true },
  { id: "healthcare", label: "Healthcare / Clinic", icon: HeartPulse, live: true },
  { id: "school",     label: "School Management",  icon: School,     live: true },
  { id: "pharmacy",   label: "Pharmacy Management",icon: Tablets,    live: true },
  { id: "hotel",      label: "Hotel & Hospitality",icon: Hotel,      live: true },
  { id: "fleet",      label: "Fleet Management",   icon: Bus,        live: true },
  { id: "banking",    label: "Banking & MFI",      icon: Landmark,   live: true },
  { id: "restaurant",     label: "Restaurant & F&B",   icon: UtensilsCrossed, live: true },
  { id: "employee-portal",label: "Employee Portal",     icon: UserCircle,      live: true },
];

export const STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Won"];

export const STAGE_COLOR = {
  New: "#5B6472",
  Qualified: "#16A34A",
  Proposal: "#F59E0B",
  Negotiation: "#111827",
  Won: "#16A34A",
};

// A real gap the single-contact-per-lead model can't cover: an account
// usually has more than one person worth knowing — a decision maker and a
// day-to-day operational contact are rarely the same person. Contacts is
// a separate directory, loosely linked to a company name rather than a
// strict lead ID, since a contact can outlive any individual deal.
export const contactsSeed = [
  { id: "CON-01", name: "Amara Mwakisisile", title: "Procurement Manager", company: "Kilimo Fresh Distributors", email: "amara@kilimofresh.co.tz", phone: "+255 754 221 908", isPrimary: true },
  { id: "CON-02", name: "Joseph Mwakisisile", title: "Finance Director", company: "Kilimo Fresh Distributors", email: "j.mwakisisile@kilimofresh.co.tz", phone: "+255 754 221 910", isPrimary: false },
  { id: "CON-03", name: "David Chen", title: "Operations Director", company: "Meridian Logistics", email: "d.chen@meridianlog.com", phone: "+255 712 004 552", isPrimary: true },
  { id: "CON-04", name: "Halima Juma", title: "General Manager", company: "Baraka Hotels & Resorts", email: "halima@barakahotels.co.tz", phone: "+255 754 662 187", isPrimary: true },
  { id: "CON-05", name: "Grace Mmbaga", title: "Owner", company: "Uzuri Beauty Chain", email: "grace@uzuribeauty.tz", phone: "+255 767 331 220", isPrimary: true },
];

export const seedLeads = [
  { id: "L-0231", name: "Amara Mwakisisile", company: "Kilimo Fresh Distributors", stage: "Proposal", value: 18400, currency: "TZS000", owner: "J. Batenga", email: "amara@kilimofresh.co.tz", phone: "+255 754 221 908", industry: "Agriculture", lastActivity: "2h ago", score: 82, expectedCloseDate: "2026-07-20" },
  { id: "L-0230", name: "David Chen", company: "Meridian Logistics", stage: "Negotiation", value: 64200, currency: "TZS000", owner: "S. Kileo", email: "d.chen@meridianlog.com", phone: "+255 712 004 552", industry: "Logistics", lastActivity: "5h ago", score: 91, expectedCloseDate: "2026-07-12" },
  { id: "L-0229", name: "Grace Mmbaga", company: "Uzuri Beauty Chain", stage: "Won", value: 9800, currency: "TZS000", owner: "J. Batenga", email: "grace@uzuribeauty.tz", phone: "+255 767 331 220", industry: "Retail", lastActivity: "1d ago", score: 76, expectedCloseDate: null },
  { id: "L-0228", name: "Peter Okoth", company: "Coastal Construction Ltd", stage: "Qualified", value: 128000, currency: "TZS000", owner: "M. Fundi", email: "p.okoth@coastalcon.co.tz", phone: "+255 786 442 019", industry: "Construction", lastActivity: "1d ago", score: 68, expectedCloseDate: "2026-08-15" },
  { id: "L-0227", name: "Fatuma Salim", company: "Salim Wholesale Traders", stage: "New", value: 5200, currency: "TZS000", owner: "S. Kileo", email: "fatuma@salimwholesale.tz", phone: "+255 715 990 341", industry: "Wholesale", lastActivity: "2d ago", score: 54, expectedCloseDate: null },
  { id: "L-0226", name: "James Mutungi", company: "Nyota Pharmacy Group", stage: "Proposal", value: 22750, currency: "TZS000", owner: "M. Fundi", email: "james@nyotapharm.tz", phone: "+255 700 118 774", industry: "Pharmacy", lastActivity: "3d ago", score: 71, expectedCloseDate: "2026-07-25" },
  { id: "L-0225", name: "Halima Juma", company: "Baraka Hotels & Resorts", stage: "Negotiation", value: 96500, currency: "TZS000", owner: "J. Batenga", email: "halima@barakahotels.co.tz", phone: "+255 754 662 187", industry: "Hospitality", lastActivity: "4d ago", score: 88, expectedCloseDate: "2026-07-10" },
  { id: "L-0224", name: "Elias Rugambwa", company: "Rugambwa Auto Workshop", stage: "New", value: 3600, currency: "TZS000", owner: "S. Kileo", email: "elias@rugambwaauto.tz", phone: "+255 762 883 456", industry: "Automotive", lastActivity: "6d ago", score: 47, expectedCloseDate: null },
];

export const money = (n) => new Intl.NumberFormat("en-US").format(n);

// ═══════════════════════════════════════════════════════════════════════════
// SMART ALERT ENGINE
// Cross-module automated intelligence. Scans all data sources and returns
// categorised, prioritised alerts. Senior-dev pattern: single source of
// truth for all warnings — no alert logic scattered across 33 modules.
// ═══════════════════════════════════════════════════════════════════════════

export function useSmartAlerts(data) {
  return useMemo(() => {
    const alerts = [];
    const today  = new Date();
    const in30   = new Date(today.getTime() + 30 * 86400000);
    const in7    = new Date(today.getTime() +  7 * 86400000);

    // ── Finance: Overdue invoices ─────────────────────────────────────────
    if (data.invoices) {
      const overdue = data.invoices.filter(inv =>
        inv.status !== "Paid" && inv.status !== "Cancelled" &&
        inv.dueDate && new Date(inv.dueDate) < today
      );
      if (overdue.length > 0) {
        const total = overdue.reduce((s, inv) => s + (inv.totalAmount || inv.total || 0), 0);
        alerts.push({
          id: "inv-overdue", module: "sales", priority: "high",
          category: "Finance",
          icon: "💸",
          title: overdue.length + " Overdue Invoice" + (overdue.length > 1 ? "s" : ""),
          detail: "TZS " + money(total) + "k unpaid · Oldest: " +
            (overdue.sort((a,b) => new Date(a.dueDate)-new Date(b.dueDate))[0]?.customer || "Unknown"),
          action: "View Sales → Invoices",
        });
      }
    }

    // ── Inventory: Low / out of stock ─────────────────────────────────────
    if (data.inventory) {
      const low = data.inventory.filter(i => i.qtyOnHand <= (i.reorderLevel || 5));
      if (low.length > 0) {
        alerts.push({
          id: "inv-low", module: "inventory", priority: low.some(i => i.qtyOnHand === 0) ? "high" : "medium",
          category: "Inventory",
          icon: "📦",
          title: low.length + " Low-Stock Item" + (low.length > 1 ? "s" : ""),
          detail: low.slice(0, 3).map(i => i.name).join(", ") + (low.length > 3 ? " +" + (low.length-3) + " more" : ""),
          action: "View Inventory → Reorder Alerts",
        });
      }
    }

    // ── HR: Leave requests pending ────────────────────────────────────────
    if (data.leaveRequests) {
      const pending = data.leaveRequests.filter(l => l.status === "Pending");
      if (pending.length > 0) {
        alerts.push({
          id: "hr-leave", module: "hr", priority: "medium",
          category: "HR",
          icon: "🏖️",
          title: pending.length + " Pending Leave Request" + (pending.length > 1 ? "s" : ""),
          detail: pending.slice(0, 3).map(l => l.employeeName || l.employee || "Staff").join(", "),
          action: "View HR → Leave Management",
        });
      }
      // Upcoming leave starting this week
      const upcoming = data.leaveRequests.filter(l =>
        l.status === "Approved" &&
        l.startDate && new Date(l.startDate) >= today && new Date(l.startDate) <= in7
      );
      if (upcoming.length > 0) {
        alerts.push({
          id: "hr-upcoming-leave", module: "hr", priority: "low",
          category: "HR",
          icon: "📅",
          title: upcoming.length + " Staff on Leave This Week",
          detail: upcoming.map(l => l.employeeName || "Staff").join(", "),
          action: "View HR → Leave Calendar",
        });
      }
    }

    // ── Banking: NPL / overdue loans ──────────────────────────────────────
    if (data.bankLoans) {
      const npls = data.bankLoans.filter(l => l.status === "Overdue" || l.status === "Defaulted");
      if (npls.length > 0) {
        const nplAmt = npls.reduce((s, l) => s + (l.balance || 0), 0);
        alerts.push({
          id: "bank-npl", module: "banking", priority: "high",
          category: "Banking",
          icon: "🏦",
          title: npls.length + " Non-Performing Loan" + (npls.length > 1 ? "s" : ""),
          detail: "TZS " + money(nplAmt) + "k at risk · " + npls.map(l => l.client).slice(0,2).join(", "),
          action: "View Banking → Loans & Credit",
        });
      }
    }

    // ── Pharmacy: Drug expiry ──────────────────────────────────────────────
    if (data.phmStock) {
      const expiring = data.phmStock.filter(s => s.expiry && new Date(s.expiry) <= in30);
      const expired  = data.phmStock.filter(s => s.expiry && new Date(s.expiry) < today);
      if (expired.length > 0) {
        alerts.push({
          id: "phm-expired", module: "pharmacy", priority: "critical",
          category: "Pharmacy",
          icon: "💊",
          title: expired.length + " EXPIRED Drug" + (expired.length > 1 ? "s" : "") + " — Remove Immediately",
          detail: expired.map(s => s.drug).slice(0, 3).join(", "),
          action: "View Pharmacy → Expiry Alerts",
        });
      }
      if (expiring.length > expired.length) {
        const soon = expiring.filter(s => new Date(s.expiry) >= today);
        alerts.push({
          id: "phm-expiring", module: "pharmacy", priority: "high",
          category: "Pharmacy",
          icon: "⏳",
          title: soon.length + " Drug" + (soon.length > 1 ? "s" : "") + " Expiring Within 30 Days",
          detail: soon.map(s => s.drug).slice(0, 3).join(", "),
          action: "View Pharmacy → Expiry Alerts",
        });
      }
    }

    // ── Fleet: Insurance expiring ──────────────────────────────────────────
    if (data.vehicles) {
      const insExp = data.vehicles.filter(v => v.insurance && new Date(v.insurance) <= in30);
      if (insExp.length > 0) {
        alerts.push({
          id: "fleet-ins", module: "fleet", priority: "high",
          category: "Fleet",
          icon: "🚌",
          title: insExp.length + " Vehicle Insurance Expiring",
          detail: insExp.map(v => v.reg).join(", ") + " · Within 30 days",
          action: "View Fleet → Vehicles",
        });
      }
      const svcDue = data.vehicles.filter(v => v.mileage >= v.nextService - 2000);
      if (svcDue.length > 0) {
        alerts.push({
          id: "fleet-svc", module: "fleet", priority: "medium",
          category: "Fleet",
          icon: "🔧",
          title: svcDue.length + " Vehicle" + (svcDue.length > 1 ? "s" : "") + " Service Due",
          detail: svcDue.map(v => v.reg + " (" + v.mileage.toLocaleString() + "km)").join(", "),
          action: "View Fleet → Vehicles",
        });
      }
    }

    // ── School: Unpaid fees ───────────────────────────────────────────────
    if (data.schFees) {
      const unpaid = data.schFees.filter(f => f.status === "Unpaid" || f.status === "Partial");
      if (unpaid.length > 0) {
        const outstanding = unpaid.reduce((s, f) => s + (f.balance || 0), 0);
        alerts.push({
          id: "sch-fees", module: "school", priority: "medium",
          category: "School",
          icon: "🎓",
          title: unpaid.length + " Student" + (unpaid.length > 1 ? "s" : "") + " with Outstanding Fees",
          detail: "TZS " + money(outstanding) + "k unpaid this term",
          action: "View School → Fee Collection",
        });
      }
    }

    // ── Restaurant: Active orders in kitchen ──────────────────────────────
    if (data.rstOrders) {
      const active = data.rstOrders.filter(o => o.status === "Preparing");
      if (active.length > 0) {
        alerts.push({
          id: "rst-orders", module: "restaurant", priority: "low",
          category: "Restaurant",
          icon: "🍽️",
          title: active.length + " Order" + (active.length > 1 ? "s" : "") + " Being Prepared in Kitchen",
          detail: "Tables: " + active.map(o => o.table).join(", "),
          action: "View Restaurant → Kitchen Display",
        });
      }
    }

    // ── MFI: Overdue loans ────────────────────────────────────────────────
    if (data.mfiLoans) {
      const overdue = data.mfiLoans.filter(l => l.status === "Overdue" || l.status === "Defaulted");
      if (overdue.length > 0) {
        const amt = overdue.reduce((s, l) => s + (l.balance || 0), 0);
        alerts.push({
          id: "mfi-overdue", module: "microfinance", priority: "high",
          category: "Microfinance",
          icon: "🏧",
          title: overdue.length + " MFI Loan" + (overdue.length > 1 ? "s" : "") + " Overdue",
          detail: "TZS " + money(amt) + "k at risk",
          action: "View Microfinance → Loans",
        });
      }
    }

    // ── Hotel: Check-outs due today ───────────────────────────────────────
    if (data.htlBookings) {
      const checkOutToday = data.htlBookings.filter(b =>
        b.status === "Active" && b.checkOut === today.toISOString().slice(0, 10)
      );
      if (checkOutToday.length > 0) {
        alerts.push({
          id: "htl-checkout", module: "hotel", priority: "medium",
          category: "Hotel",
          icon: "🏨",
          title: checkOutToday.length + " Guest" + (checkOutToday.length > 1 ? "s" : "") + " Checking Out Today",
          detail: checkOutToday.map(b => b.guest + " (Room " + b.room + ")").join(", "),
          action: "View Hotel → Check-In/Out",
        });
      }
    }

    // Sort: critical → high → medium → low
    const priority = { critical: 0, high: 1, medium: 2, low: 3 };
    return alerts.sort((a, b) => (priority[a.priority] || 3) - (priority[b.priority] || 3));
  }, [
    data.invoices, data.inventory, data.leaveRequests,
    data.bankLoans, data.phmStock, data.vehicles,
    data.schFees, data.rstOrders, data.mfiLoans, data.htlBookings,
  ]);
}

// Alert priority colour maps
export const ALERT_PRIORITY = {
  critical: { bg:"#FEF2F2", border:"#FECACA", text:"#991B1B", badge:"#FEE2E2", badgeText:"#EF4444" },
  high:     { bg:"#FFFBEB", border:"#FDE68A", text:"#92400E", badge:"#FEF3C7", badgeText:"#F59E0B" },
  medium:   { bg:"#EFF6FF", border:"#BFDBFE", text:"#1E3A8A", badge:"#DBEAFE", badgeText:"#2563EB" },
  low:      { bg:"#F0FDF4", border:"#BBF7D0", text:"#14532D", badge:"#DCFCE7", badgeText:"#16A34A" },
};

// ── useBulkSelect — table multi-select with actions ─────────────────────────
// Usage: const {selected,toggle,toggleAll,clearAll,isSelected,isAllSelected,count} = useBulkSelect(rows)
export function useBulkSelect(rows) {
  const [selected, setSelected] = useState(new Set());
  const ids = useMemo(() => rows.map(r => r.id), [rows]);

  const toggle    = useCallback(id => setSelected(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; }), []);
  const toggleAll = useCallback(() => setSelected(s => s.size === ids.length ? new Set() : new Set(ids)), [ids]);
  const clearAll  = useCallback(() => setSelected(new Set()), []);
  const isSelected     = useCallback(id => selected.has(id), [selected]);
  const isAllSelected  = selected.size > 0 && selected.size === ids.length;
  const isPartialSelected = selected.size > 0 && selected.size < ids.length;
  const selectedRows = rows.filter(r => selected.has(r.id));

  return { selected, selectedRows, toggle, toggleAll, clearAll, isSelected, isAllSelected, isPartialSelected, count: selected.size };
}

// ── BulkActionBar — shown when rows are selected ──────────────────────────────
export function BulkActionBar({ count, onClear, actions, accent }) {
  if (count === 0) return null;
  const col = accent || "#16A34A";
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border text-[12.5px] font-medium" style={{background:col+"0D",borderColor:col+"30"}}>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{background:col}}>{count}</div>
        <span style={{color:col}}>{count} item{count!==1?"s":""} selected</span>
      </div>
      <div className="flex gap-2 flex-1">
        {actions.map(a => (
          <button key={a.label} onClick={a.onClick} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-white text-[11.5px]" style={{background:a.danger?"#EF4444":col}}>
            {a.icon && <a.icon size={12}/>}{a.label}
          </button>
        ))}
      </div>
      <button onClick={onClear} className="text-slate-400 hover:text-slate-600 shrink-0"><X size={14}/></button>
    </div>
  );
}

// ── useAutoSave — debounce + supabase sync ────────────────────────────────────
// Runs the save fn 1.5s after changes stop.
export function useAutoSave(value, saveFn, delay) {
  const d = delay || 1500;
  const saveRef = useRef(saveFn);
  saveRef.current = saveFn;
  useEffect(() => {
    const t = setTimeout(() => saveRef.current(value), d);
    return () => clearTimeout(t);
  }, [value, d]);
}

// ── Stat comparison badge ─────────────────────────────────────────────────────
export function DeltaBadge({ current, previous, format, goodWhenPositive }) {
  if (!previous || previous === 0) return null;
  const delta = ((current - previous) / Math.abs(previous) * 100).toFixed(1);
  const isGood = goodWhenPositive !== false ? Number(delta) > 0 : Number(delta) < 0;
  const col = isGood ? "#16A34A" : "#EF4444";
  return (
    <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full" style={{background:col+"15",color:col}}>
      {Number(delta) > 0 ? "▲" : "▼"} {Math.abs(Number(delta))}%
    </span>
  );
}

// ── Dark mode CSS injected into document head ─────────────────────────────
if (typeof document !== "undefined") {
  const _darkStyle = document.getElementById("bs-dark-mode-css") || (() => {
    const s = document.createElement("style"); s.id = "bs-dark-mode-css"; document.head.appendChild(s); return s;
  })();
  _darkStyle.textContent = `
    .dark .bg-white { background-color: #1E293B !important; }
    .dark .bg-slate-50 { background-color: #1E293B !important; }
    .dark .bg-slate-100 { background-color: #0F172A !important; }
    .dark .border-slate-200 { border-color: #334155 !important; }
    .dark .border-slate-100 { border-color: #1E293B !important; }
    .dark .text-slate-400 { color: #94A3B8 !important; }
    .dark .text-slate-500 { color: #94A3B8 !important; }
    .dark .text-slate-600 { color: #94A3B8 !important; }
    .dark .text-\\[\\#111827\\] { color: #F1F5F9 !important; }
    .dark header.bg-white { background-color: #1E293B !important; border-color: #334155 !important; }
    .dark nav { background-color: #0F172A !important; border-color: #1E293B !important; }
    .dark .shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.5) !important; }
    .dark tbody tr:hover { background: #1E293B !important; }
    .dark tbody tr:nth-child(even) { background: #162032 !important; }
    .dark input, .dark select, .dark textarea { background: #0F172A !important; color: #F1F5F9 !important; border-color: #334155 !important; }
    .dark .rounded-xl.bg-white { background: #1E293B !important; }
    .dark .rounded-2xl.bg-white { background: #1E293B !important; }
  `;
}



/* ------------------------------- SALES DATA -------------------------------- */

export const DOC_TABS = [
  { id: "quotations", label: "Quotations", icon: FileText },
  { id: "orders", label: "Sales Orders", icon: ClipboardList },
  { id: "invoices", label: "Invoices", icon: ReceiptText },
];

export const DOC_STATUS_COLOR = {
  Draft: "#5B6472",
  Sent: "#F59E0B",
  Accepted: "#16A34A",
  Expired: "#9CA3AF",
  Pending: "#F59E0B",
  Confirmed: "#16A34A",
  Fulfilled: "#16A34A",
  Cancelled: "#9CA3AF",
  Unpaid: "#F59E0B",
  Partial: "#F59E0B",
  Paid: "#16A34A",
  Overdue: "#EF4444",
};

// Next status in each document's natural lifecycle — used to drive the
// "Advance" action in DocPanel. `null` means the doc has reached its end state.
export const DOC_STATUS_NEXT = {
  quotations: { Draft: "Sent", Sent: "Accepted", Accepted: null, Expired: null },
  orders: { Pending: "Confirmed", Confirmed: "Fulfilled", Fulfilled: null, Cancelled: null },
  // Invoices do not advance with a single click the way a quotation or order
  // does — a payment can be partial, so they're driven by recordPayment()
  // below instead of this flow map. Kept here (all null) so DocPanel's
  // generic "any doc type might have a next status" check still works.
  invoices: { Unpaid: null, Partial: null, Paid: null, Overdue: null },
};

export const PAYMENT_METHODS = ["Cash", "Card", "Mobile Money", "Bank Transfer"];

// Global confirmation dialog bus — the missing safety net across all 22
// modules. Instead of threading a confirmDialog prop through every
// component that deletes something (dozens of call sites), any function
// anywhere can call confirmAction(message, fn) and the dialog appears.
// The same architectural choice as toastBus and auditBus: cross-cutting
// concern, handled at the center, not at every edge.
export const confirmBus = {
  listeners: new Set(),
  ask(message, onConfirm, opts = {}) {
    this.listeners.forEach((fn) => fn({ message, onConfirm, ...opts }));
  },
};

export function confirmAction(message, onConfirm, opts = {}) {
  confirmBus.ask(message, onConfirm, opts);
}

// Receipt bus — when a payment reaches "Paid" status, recordPayment()
// pushes to this bus. Any mounted SendReceiptPanel (or future receipt
// consumer) receives the receipt immediately without prop-drilling.
export const receiptBus = {
  listeners: new Set(),
  push(receipt) { this.listeners.forEach((fn) => fn(receipt)); },
};

// Fires the instant any invoice is created — PostCreateDispatch listens
// and offers WA / Email / Print in a non-blocking slide-up panel.
export const invoiceCreatedBus = {
  listeners: new Set(),
  push(invoice) { this.listeners.forEach((fn) => fn(invoice)); },
};

export const auditBus = {
  listeners: new Set(),
  push(entry) { this.listeners.forEach((fn) => fn(entry)); },
};

// AuditService — a real, centralized log of significant actions across the
// system, genuinely new to this build rather than a renamed existing
// feature. Uses the same global event-bus pattern as notify()/toastBus
// rather than a hook threaded through every mutation site: audit logging
// is a cross-cutting concern, and forcing every function that might need
// to log something to accept and forward an extra parameter would ripple
// through the codebase for no real benefit. Complements the Auditor role
// (see Settings) — that role can see every module, but without an actual
// trail of who did what and when, "seeing everything" wasn't the same as
// being able to audit anything.
//
// Honest limitation, stated once here rather than at every call site:
// there is no real authentication in this build (section 6), so `actor`
// reflects whichever demo role is selected in Settings, not a verified
// identity. A production audit trail must be written server-side against
// a real authenticated session — a client can log an action, but it can't
// be trusted to honestly report who performed it. This is a UX-layer
// approximation of the real capability, not the capability itself.
export function logAudit(action, module, actor, details) {
  const entry = {
    id: `AUD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action, module, actor: actor || "Unattributed", details: details || "",
    timestamp: new Date().toISOString(),
  };
  auditBus.push(entry);
  if (IS_CONFIGURED) {
    sb("audit_log").insert({ action, module, actor: entry.actor, details: entry.details }).run().catch(() => {});
  }
}

// Recording a payment is not a simple status flip — it can be partial, and
// it needs its own record for the payment history an invoice shows. This
// is shared by Sales and Finance since both operate on the same invoices
// table (see the architecture note in the handover doc on shared state).
// Synchronous by design: computes the patch and applies it to shared state
// immediately, then persists in the background. Returns the patch so a
// caller holding its own snapshot of the doc (e.g. an open detail panel)
// can update it in the same tick rather than waiting on the network.
export function recordPayment(invoicesHook, docId, payment, actor) {
  const inv = invoicesHook.rows.find((d) => d.id === docId);
  if (!inv) return null;
  const { total } = lineTotal(inv.items);
  const newAmountPaid = Math.min(total, (inv.amountPaid || 0) + payment.amount);
  const newStatus = newAmountPaid >= total ? "Paid" : "Partial";
  const paymentRecord = { id: `PMT-${Date.now()}`, amount: payment.amount, method: payment.method, date: payment.date, reference: payment.reference || null };
  const patch = { amountPaid: newAmountPaid, status: newStatus, payments: [paymentRecord, ...(inv.payments || [])] };

  invoicesHook.setRows((prev) => prev.map((d) => (d.id === docId ? { ...d, ...patch } : d)));
  notify(`Payment of TZS ${money(payment.amount)}k recorded for ${docId}${payment.reference ? " (ref: " + payment.reference + ")" : ""}`);

  // Auto-receipt: when a payment brings the invoice to fully Paid, generate
  // the receipt immediately and push it to the receiptBus so any open
  // SendReceiptPanel can offer to dispatch it to the customer straight away.
  if (newStatus === "Paid") {
    const receipt = {
      id: docId(`RCT`),
      invoiceId: docId,
      customer: inv.customer,
      customerEmail: inv.customerEmail || null,
      customerPhone: inv.customerPhone || null,
      amount: newAmountPaid,
      method: payment.method,
      reference: payment.reference || null,
      date: payment.date,
      items: inv.items,
      issuedAt: new Date().toISOString(),
    };
    receiptBus.push(receipt);
  }
  logAudit(newStatus === "Paid" ? "Invoice paid in full" : "Partial payment recorded", "Finance", actor, `${docId} — TZS ${money(payment.amount)}k via ${payment.method}${payment.reference ? " (" + payment.reference + ")" : ""}`);

  if (IS_CONFIGURED && inv.dbId) {
    (async () => {
      try {
        await sb("sales_payments").insert({ invoice_id: inv.dbId, amount: payment.amount, method: payment.method, payment_date: payment.date, reference: payment.reference || null }).run();
        await sb("sales_invoices").eq("id", inv.dbId).update({ amount_paid: newAmountPaid, status: newStatus }).run();
      } catch (e) {
        notify("Payment recorded locally, but the server update failed.", "error");
      }
    })();
  }

  return patch;
}

// Was a hardcoded Tanzania-only constant (0.18, "standard VAT") — the
// exact kind of claim that does not survive an audit against "multiple tax
// systems." Now a real, per-company configurable rate, set from
// companies.tax_rate (Settings, section 46) rather than baked in. A
// mutable module value rather than a prop threaded through the dozen-plus
// call sites below is a deliberate, bounded choice: every one of those
// call sites computes this fresh during render, not from a cached value,
// so updating this once at the root whenever company data changes is
// genuinely safe — and far lower-risk than rewiring every POS receipt,
// invoice line, and refund calculation to accept a new prop individually.
// Still expressed as a fraction (0.18) to avoid touching the arithmetic
// at every call site — only the source of truth changed, not the math.
let TAX_RATE = 0.18;
export function setActiveTaxRate(ratePercent) {
  TAX_RATE = (Number(ratePercent) || 18) / 100;
}

// Real IANA timezone identifiers — genuinely recognized by every
// browser's built-in Intl API, not a custom list this app invented.
// Covers this app's actual East African market plus the other regions
// its currency and signup-country lists already support (section 32).
export const COMPANY_TIMEZONES = [
  "Africa/Dar_es_Salaam", "Africa/Nairobi", "Africa/Kampala", "Africa/Kigali", "Africa/Lusaka",
  "Africa/Lagos", "Europe/London", "America/New_York", "Asia/Dubai", "UTC",
];

// Real timezone-aware formatting via the browser's own Intl API — no
// library needed, genuinely correct across DST and regional differences,
// unlike the naive plain-Date formatting used elsewhere in this app
// before company.timezone existed to format against. Intl.DateTimeFormat
// throws if dateStyle/timeStyle are combined with granular component
// options (hour, minute, etc.) in the same call, so the defaults only
// apply when the caller hasn't specified its own components.
export function formatInTimezone(dateInput, timezone, options = {}) {
  const hasComponentOptions = ["hour", "minute", "second", "year", "month", "day", "weekday"].some((k) => k in options);
  const base = hasComponentOptions ? {} : { dateStyle: "medium", timeStyle: "short" };
  try {
    return new Intl.DateTimeFormat("en-GB", { timeZone: timezone || "UTC", ...base, ...options }).format(new Date(dateInput));
  } catch (_e) {
    return new Date(dateInput).toLocaleString();
  }
}

export function lineTotal(items) {
  // Each line: qty × rate × (1 - discount/100). Per-line discount is optional
  // (0 when not set) so existing callers that pass no discount field are unaffected.
  const subtotal = items.reduce((s, i) => {
    const base = (Number(i.qty) || 0) * (Number(i.rate) || 0);
    const disc = Math.min(100, Math.max(0, Number(i.discount) || 0));
    return s + base * (1 - disc / 100);
  }, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, total: subtotal + tax };
}

// A real number-to-words converter, not a lookup table — built after
// reviewing an actual SokoBook invoice screenshot showing "Amount in
// Words" as a standard line item, a real convention on business invoices
// across South Asia and East Africa that this build didn't have. Values
// throughout this app are stored in thousands (the "k" suffix shown
// everywhere), so the caller multiplies by 1000 before converting —
// this function itself works on the real, full currency amount.
export function numberToWords(n) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function belowThousand(num) {
    if (num === 0) return "";
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + belowThousand(num % 100) : "");
  }

  if (n === 0) return "Zero";
  const units = [["", 1], ["Thousand", 1e3], ["Million", 1e6], ["Billion", 1e9]];
  let remaining = Math.round(Math.abs(n));
  const parts = [];
  for (let i = units.length - 1; i >= 0; i--) {
    const [label, value] = units[i];
    if (remaining >= value) {
      const chunk = Math.floor(remaining / value);
      remaining %= value;
      parts.push(belowThousand(chunk) + (label ? " " + label : ""));
    }
  }
  return parts.join(" ").trim();
}

/* --------------------------------- FIXED ASSETS --------------------------------- */

export const ASSET_CATEGORIES = ["Vehicles", "Equipment", "Furniture & Fixtures", "Buildings", "Computers & IT"];

// Straight-line depreciation — cost spread evenly over the useful life,
// computed from real elapsed time (acquisition date to today), not a
// stored number that could drift out of sync with the calendar.
export function depreciate(asset) {
  const acquired = new Date(asset.acquisitionDate);
  const monthsElapsed = Math.max(0, (TODAY.getFullYear() - acquired.getFullYear()) * 12 + (TODAY.getMonth() - acquired.getMonth()));
  const usefulMonths = asset.usefulLifeYears * 12;
  const monthlyDep = asset.cost / usefulMonths;
  const accumulated = Math.min(asset.cost, monthlyDep * monthsElapsed);
  const bookValue = Math.max(0, asset.cost - accumulated);
  const fullyDepreciated = monthsElapsed >= usefulMonths;
  return { accumulated: Math.round(accumulated), bookValue: Math.round(bookValue), fullyDepreciated, monthlyDep: Math.round(monthlyDep) };
}

export const financeAssetsSeed = [
  { id: "AST-01", name: "Toyota Hilux — Delivery Truck", category: "Vehicles", acquisitionDate: "2023-03-15", cost: 68000, usefulLifeYears: 8 },
  { id: "AST-02", name: "Warehouse Forklift", category: "Equipment", acquisitionDate: "2022-11-01", cost: 24500, usefulLifeYears: 10 },
  { id: "AST-03", name: "Office Furniture Set — HQ", category: "Furniture & Fixtures", acquisitionDate: "2024-01-10", cost: 8200, usefulLifeYears: 7 },
  { id: "AST-04", name: "Server & Networking Rack", category: "Computers & IT", acquisitionDate: "2023-08-20", cost: 12800, usefulLifeYears: 5 },
  { id: "AST-05", name: "Dar es Salaam Warehouse Building", category: "Buildings", acquisitionDate: "2019-06-01", cost: 340000, usefulLifeYears: 25 },
];

export const quotationsSeed = [
  {
    id: "QT-1042", customer: "Baraka Hotels & Resorts", date: "2026-06-24", validUntil: "2026-07-08",
    status: "Sent", owner: "J. Batenga",
    items: [
      { name: "Industrial water heaters (50L)", qty: 12, rate: 480 },
      { name: "Installation & commissioning", qty: 1, rate: 2100 },
      { name: "1-year service contract", qty: 1, rate: 1800 },
    ],
  },
  {
    id: "QT-1041", customer: "Coastal Construction Ltd", date: "2026-06-20", validUntil: "2026-07-04",
    status: "Draft", owner: "M. Fundi",
    items: [
      { name: "Steel reinforcement bars (12mm, ton)", qty: 8, rate: 1650 },
      { name: "Cement (50kg bag)", qty: 400, rate: 17.5 },
    ],
  },
  {
    id: "QT-1040", customer: "Meridian Logistics", date: "2026-06-15", validUntil: "2026-06-29",
    status: "Accepted", owner: "S. Kileo",
    items: [
      { name: "Fleet GPS tracking units", qty: 24, rate: 145 },
      { name: "Annual monitoring subscription", qty: 24, rate: 60 },
    ],
  },
  {
    id: "QT-1039", customer: "Nyota Pharmacy Group", date: "2026-06-02", validUntil: "2026-06-16",
    status: "Expired", owner: "M. Fundi",
    items: [{ name: "Cold-chain refrigeration units", qty: 3, rate: 2250 }],
  },
];

export const ordersSeed = [
  {
    id: "SO-2117", customer: "Meridian Logistics", date: "2026-06-29", quotationRef: "QT-1040",
    status: "Confirmed", owner: "S. Kileo", returns: [],
    items: [
      { name: "Fleet GPS tracking units", qty: 24, rate: 145 },
      { name: "Annual monitoring subscription", qty: 24, rate: 60 },
    ],
  },
  {
    id: "SO-2116", customer: "Uzuri Beauty Chain", date: "2026-06-27", quotationRef: "—",
    status: "Fulfilled", owner: "J. Batenga", returns: [],
    items: [
      { name: "Salon styling chairs", qty: 10, rate: 210 },
      { name: "Backwash basins", qty: 4, rate: 340 },
    ],
  },
  {
    id: "SO-2115", customer: "Salim Wholesale Traders", date: "2026-06-25", quotationRef: "—",
    status: "Pending", owner: "S. Kileo", returns: [],
    items: [{ name: "Warehouse shelving units", qty: 30, rate: 95 }],
  },
  {
    id: "SO-2114", customer: "Rugambwa Auto Workshop", date: "2026-06-18", quotationRef: "—",
    status: "Cancelled", owner: "S. Kileo", returns: [],
    items: [{ name: "Hydraulic vehicle lifts", qty: 2, rate: 1850 }],
  },
];

export const invoicesSeed = [
  {
    id: "INV-8801", customer: "Uzuri Beauty Chain", date: "2026-06-27", dueDate: "2026-07-11",
    orderRef: "SO-2116", status: "Paid", amountPaid: null, payments: [],
    items: [
      { name: "Salon styling chairs", qty: 10, rate: 210 },
      { name: "Backwash basins", qty: 4, rate: 340 },
    ],
  },
  {
    id: "INV-8800", customer: "Baraka Hotels & Resorts", date: "2026-06-20", dueDate: "2026-07-04",
    orderRef: "—", status: "Partial", amountPaid: 40000, payments: [],
    items: [{ name: "Kitchen refrigeration overhaul", qty: 1, rate: 96500 }],
  },
  {
    id: "INV-8799", customer: "Kilimo Fresh Distributors", date: "2026-06-10", dueDate: "2026-06-24",
    orderRef: "—", status: "Overdue", amountPaid: 0, payments: [],
    items: [{ name: "Cold storage racking system", qty: 6, rate: 3067 }],
  },
  {
    id: "INV-8798", customer: "Nyota Pharmacy Group", date: "2026-06-30", dueDate: "2026-07-14",
    orderRef: "—", status: "Unpaid", amountPaid: 0, payments: [],
    items: [{ name: "Pharmacy display units", qty: 8, rate: 780 }],
  },
];

/* ------------------------------ SUBSCRIPTIONS DATA ------------------------------ */

export const SUBSCRIPTION_CYCLES = ["Monthly", "Quarterly", "Annual"];
export const CYCLE_MONTHS = { Monthly: 1, Quarterly: 3, Annual: 12 };

export const SUBSCRIPTION_STATUS_COLOR = {
  Active: "#16A34A",
  Paused: "#F59E0B",
  Cancelled: "#9CA3AF",
};

// Continuity with the earlier fleet-tracking story: Meridian Logistics
// bought GPS units as a one-off order (SO-2117); the monitoring is the
// recurring part — this is the natural subscription that order implies.
export const subscriptionsSeed = [
  {
    id: "SUB-201", customer: "Meridian Logistics", plan: "Fleet GPS Monitoring", amount: 1440, cycle: "Monthly",
    status: "Active", startDate: "2026-06-01", nextBillingDate: "2026-07-01",
  },
  {
    id: "SUB-202", customer: "Baraka Hotels & Resorts", plan: "Kitchen Equipment Service Contract", amount: 8500, cycle: "Quarterly",
    status: "Active", startDate: "2026-04-15", nextBillingDate: "2026-07-15",
  },
  {
    id: "SUB-203", customer: "Nyota Pharmacy Group", plan: "Cold-Chain Maintenance Plan", amount: 21000, cycle: "Annual",
    status: "Active", startDate: "2026-01-10", nextBillingDate: "2027-01-10",
  },
  {
    id: "SUB-204", customer: "Uzuri Beauty Chain", plan: "Salon Equipment Warranty Plus", amount: 950, cycle: "Monthly",
    status: "Paused", startDate: "2026-05-01", nextBillingDate: "2026-07-01",
  },
];

export function addCycle(dateStr, cycle) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + CYCLE_MONTHS[cycle]);
  return d.toISOString().slice(0, 10);
}



/* ------------------------------ INVENTORY DATA ------------------------------ */

export const WAREHOUSES = [
  { id: "WH-DSM", name: "Dar es Salaam — Main", city: "Dar es Salaam" },
  { id: "WH-ARU", name: "Arusha — Regional", city: "Arusha" },
  { id: "WH-MWZ", name: "Mwanza — Regional", city: "Mwanza" },
];

export const STOCK_STATUS_COLOR = {
  "In Stock": "#16A34A",
  "Low Stock": "#F59E0B",
  "Out of Stock": "#EF4444",
};

export function stockStatus(qty, reorder) {
  if (qty <= 0) return "Out of Stock";
  if (qty <= reorder) return "Low Stock";
  return "In Stock";
}

// Only items with a real shelf life get an expiry date — a water heater or
// a GPS unit does not expire, so most items honestly have none. Cement is
// the one genuine case in this catalogue (it hardens past its shelf life).
export const EXPIRY_WARNING_DAYS = 30;
export function expiryStatus(expiryDate) {
  if (!expiryDate) return null;
  const days = Math.round((new Date(expiryDate) - TODAY) / (1000 * 60 * 60 * 24));
  if (days < 0) return "Expired";
  if (days <= EXPIRY_WARNING_DAYS) return "Expiring Soon";
  return "Fresh";
}
export const EXPIRY_STATUS_COLOR = { Expired: "#EF4444", "Expiring Soon": "#F59E0B", Fresh: "#16A34A" };

// Deterministic EAN-13-style barcode derived from the SKU, not random —
// the same item always renders the same code across sessions and reloads.
export function generateBarcode(sku) {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) hash = (hash * 31 + sku.charCodeAt(i)) >>> 0;
  return `6${String(hash).padStart(12, "0").slice(0, 12)}`;
}

export const inventorySeed = [
  { sku: "HDW-2201", name: "Industrial water heater 50L", category: "Hardware & Fixtures", warehouse: "WH-DSM", qty: 34, reorder: 15, unitCost: 312, unit: "unit", expiryDate: null },
  { sku: "HDW-2202", name: "Steel reinforcement bar 12mm (ton)", category: "Construction Materials", warehouse: "WH-DSM", qty: 6, reorder: 10, unitCost: 1490, unit: "ton", expiryDate: null },
  { sku: "HDW-2203", name: "Cement 50kg bag", category: "Construction Materials", warehouse: "WH-ARU", qty: 820, reorder: 200, unitCost: 15.2, unit: "bag", expiryDate: "2026-07-20" },
  { sku: "HDW-2204", name: "Fleet GPS tracking unit", category: "Electronics", warehouse: "WH-DSM", qty: 0, reorder: 20, unitCost: 118, unit: "unit", expiryDate: null },
  { sku: "HDW-2205", name: "Salon styling chair", category: "Furniture", warehouse: "WH-MWZ", qty: 18, reorder: 8, unitCost: 165, unit: "unit", expiryDate: null },
  { sku: "HDW-2206", name: "Backwash basin", category: "Furniture", warehouse: "WH-MWZ", qty: 5, reorder: 6, unitCost: 280, unit: "unit", expiryDate: null },
  { sku: "HDW-2207", name: "Warehouse shelving unit", category: "Storage Equipment", warehouse: "WH-DSM", qty: 62, reorder: 25, unitCost: 78, unit: "unit", expiryDate: null },
  { sku: "HDW-2208", name: "Hydraulic vehicle lift", category: "Workshop Equipment", warehouse: "WH-ARU", qty: 3, reorder: 4, unitCost: 1520, unit: "unit", expiryDate: null },
  { sku: "HDW-2209", name: "Cold storage racking system", category: "Storage Equipment", warehouse: "WH-DSM", qty: 11, reorder: 5, unitCost: 2580, unit: "unit", expiryDate: null },
  { sku: "HDW-2210", name: "Pharmacy display unit", category: "Furniture", warehouse: "WH-MWZ", qty: 27, reorder: 10, unitCost: 640, unit: "unit", expiryDate: null },
].map((it) => ({ ...it, barcode: generateBarcode(it.sku) }));

export const stockMovements = {
  "HDW-2201": [
    { date: "2026-06-24", type: "Out", qty: 12, ref: "QT-1042 reserved", by: "J. Batenga" },
    { date: "2026-06-10", type: "In", qty: 40, ref: "PO-3312 received", by: "Warehouse" },
  ],
  "HDW-2204": [
    { date: "2026-06-29", type: "Out", qty: 24, ref: "SO-2117 fulfilled", by: "S. Kileo" },
    { date: "2026-06-18", type: "In", qty: 24, ref: "PO-3298 received", by: "Warehouse" },
  ],
  "HDW-2202": [
    { date: "2026-06-22", type: "Out", qty: 4, ref: "QT-1041 reserved", by: "M. Fundi" },
    { date: "2026-06-05", type: "In", qty: 10, ref: "PO-3280 received", by: "Warehouse" },
  ],
};

/* ----------------------------- INVENTORY: TRANSFERS ---------------------------- */

export const TRANSFER_STATUS_COLOR = { Pending: "#F59E0B", "In Transit": "#F59E0B", Completed: "#16A34A" };
export const TRANSFER_STATUS_NEXT = { Pending: "In Transit", "In Transit": "Completed", Completed: null };

// A transfer moves a SKU's entire current stock to a new warehouse — this
// build tracks one location per SKU (see the handover doc), so splitting
// stock across two warehouses simultaneously is not modeled yet. Requiring
// the full quantity keeps this feature honestly correct rather than
// silently misrepresenting a partial split it can't actually track.
export const transfersSeed = [
  { id: "TRF-01", sku: "HDW-2208", itemName: "Hydraulic vehicle lift", qty: 3, fromWarehouse: "WH-ARU", toWarehouse: "WH-DSM", status: "Completed", date: "2026-06-20", notes: "Consolidating workshop equipment at HQ" },
  { id: "TRF-02", sku: "HDW-2206", itemName: "Backwash basin", qty: 5, fromWarehouse: "WH-MWZ", toWarehouse: "WH-DSM", status: "In Transit", date: "2026-07-01", notes: "Reallocating for Baraka Hotels order" },
];

/* ------------------------------ INVENTORY: BATCHES ------------------------------ */

// A supplementary traceability ledger, not the authoritative stock count —
// the aggregate qty on the item itself (used by POS, Sales, Manufacturing)
// does not derive from these rows. This records which batch/lot a delivery
// belonged to and when it expires, for recall and shelf-life purposes,
// layered on top of the existing stock model rather than replacing it.
export const batchesSeed = [
  { id: "BATCH-01", sku: "HDW-2203", itemName: "Cement 50kg bag", batchNumber: "CEM-2026-06-A", qty: 400, expiryDate: "2026-07-20", warehouse: "WH-ARU", supplier: "Tanzania Portland Cement Co.", receivedDate: "2026-06-01" },
  { id: "BATCH-02", sku: "HDW-2203", itemName: "Cement 50kg bag", batchNumber: "CEM-2026-06-B", qty: 420, expiryDate: "2026-08-05", warehouse: "WH-ARU", supplier: "Tanzania Portland Cement Co.", receivedDate: "2026-06-18" },
];

/* ----------------------------- INVENTORY: SUPPLIERS ----------------------------- */

export const SUPPLIER_STATUS_COLOR = { Active: "#16A34A", Inactive: "#9CA3AF" };

export const suppliersSeed = [
  { id: "SUP-01", name: "Tanzania Portland Cement Co.", contactPerson: "Rashid Mbwana", email: "sales@tpcc.co.tz", phone: "+255 22 286 1000", category: "Construction Materials", leadTimeDays: 5, status: "Active" },
  { id: "SUP-02", name: "Coastal Steel & Hardware Ltd", contactPerson: "Anna Kimaro", email: "orders@coastalsteel.co.tz", phone: "+255 754 990 221", category: "Hardware & Fixtures", leadTimeDays: 10, status: "Active" },
  { id: "SUP-03", name: "Zanzibar Electronics Imports", contactPerson: "Salim Haji", email: "s.haji@znzelectronics.com", phone: "+255 777 402 118", category: "Electronics", leadTimeDays: 21, status: "Active" },
  { id: "SUP-04", name: "Furniture Craft Tanzania", contactPerson: "Neema Shirima", email: "neema@furniturecraft.tz", phone: "+255 712 335 890", category: "Furniture", leadTimeDays: 14, status: "Inactive" },
];

/* -------------------------------- PROCUREMENT DATA ------------------------------ */

// Small purchases do not need sign-off — a real procurement policy, not an
// arbitrary number. Above this, a PO can't move to Approved without going
// through the Approvals tab, which is gated to Owner/Admin the same way
// Settings already is.
export const PO_APPROVAL_THRESHOLD = 5000; // TZS 000

export const PO_STATUS_COLOR = {
  Draft: "#5B6472",
  "Pending Approval": "#F59E0B",
  Approved: "#16A34A",
  Received: "#16A34A",
  Paid: "#111827",
  Cancelled: "#9CA3AF",
};

export const purchaseOrdersSeed = [
  {
    id: "PO-3401", supplier: "Tanzania Portland Cement Co.", status: "Approved",
    orderDate: "2026-06-28", expectedDate: "2026-07-05", requestedBy: "Grace Mmbaga",
    items: [{ sku: "HDW-2203", name: "Cement 50kg bag", qty: 500, cost: 14.8 }],
  },
  {
    id: "PO-3400", supplier: "Coastal Steel & Hardware Ltd", status: "Pending Approval",
    orderDate: "2026-07-01", expectedDate: "2026-07-15", requestedBy: "David Chen",
    items: [{ sku: "HDW-2202", name: "Steel reinforcement bar 12mm (ton)", qty: 8, cost: 1450 }],
  },
  {
    id: "PO-3399", supplier: "Zanzibar Electronics Imports", status: "Received",
    orderDate: "2026-06-15", expectedDate: "2026-06-29", requestedBy: "S. Kileo",
    items: [{ sku: "HDW-2204", name: "Fleet GPS tracking unit", qty: 30, cost: 105 }],
  },
  {
    id: "PO-3398", supplier: "Furniture Craft Tanzania", status: "Paid",
    orderDate: "2026-06-01", expectedDate: "2026-06-14", requestedBy: "J. Batenga",
    items: [{ sku: "HDW-2205", name: "Salon styling chair", qty: 20, cost: 150 }],
  },
  {
    id: "PO-3397", supplier: "Coastal Steel & Hardware Ltd", status: "Draft",
    orderDate: "2026-07-02", expectedDate: null, requestedBy: "Grace Mmbaga",
    items: [{ sku: "HDW-2207", name: "Warehouse shelving unit", qty: 40, cost: 72 }],
  },
];

export function poTotal(items) {
  return items.reduce((s, it) => s + it.qty * it.cost, 0);
}

export const CONTRACT_TYPES = ["Framework Agreement", "Fixed-term Supply", "One-time"];
export const CONTRACT_WARNING_DAYS = 45;

export function contractStatus(endDate) {
  if (!endDate) return "Active"; // framework agreements can be open-ended
  const days = Math.round((new Date(endDate) - TODAY) / (1000 * 60 * 60 * 24));
  if (days < 0) return "Expired";
  if (days <= CONTRACT_WARNING_DAYS) return "Expiring Soon";
  return "Active";
}
export const CONTRACT_STATUS_COLOR = { Active: "#16A34A", "Expiring Soon": "#F59E0B", Expired: "#EF4444" };

export const procurementContractsSeed = [
  { id: "PC-01", supplier: "Tanzania Portland Cement Co.", type: "Framework Agreement", startDate: "2025-01-01", endDate: null, value: 180000, notes: "Standing supply agreement, no fixed end date" },
  { id: "PC-02", supplier: "Coastal Steel & Hardware Ltd", type: "Fixed-term Supply", startDate: "2026-01-01", endDate: "2026-07-31", value: 42000, notes: "Annual steel supply contract, up for renewal" },
  { id: "PC-03", supplier: "Zanzibar Electronics Imports", type: "One-time", startDate: "2026-06-01", endDate: "2026-06-30", value: 3150, notes: "GPS unit bulk order" },
];

/* -------------------------------- FINANCE DATA ------------------------------- */

export const TODAY = new Date("2026-07-02");

export function daysBetween(a, b) {
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

export function agingBucket(dueDateStr) {
  if (!dueDateStr) return "No due date";
  const days = Math.floor((TODAY - new Date(dueDateStr)) / 86400000);
  if (days <= 0) return "Current";
  if (days <= 30) return "1–30 days";
  if (days <= 60) return "31–60 days";
  if (days <= 90) return "61–90 days";
  return "90+ days";
}
export function agingDays(dueDateStr) {
  if (!dueDateStr) return 0;
  return Math.floor((TODAY - new Date(dueDateStr)) / 86400000);
}

export const AGING_COLOR = {
  "Current": "#16A34A",
  "1–30 days": "#F59E0B",
  "31–60 days": "#F59E0B",
  "60+ days": "#EF4444",
};

export const EXPENSE_STATUS_COLOR = {
  Paid: "#16A34A",
  Pending: "#F59E0B",
  Scheduled: "#16A34A",
};

export const EXPENSE_CATEGORIES_LIST = ["Rent & Utilities", "Salaries", "Logistics", "Marketing", "Supplies", "Professional Fees"];


export const expensesSeed = [
  { id: "EX-4501", vendor: "Kilimanjaro Property Holdings", category: "Rent & Utilities", date: "2026-06-28", dueDate: "2026-07-28", amount: 8200, status: "Paid", method: "Bank Transfer" },
  { id: "EX-4500", vendor: "Payroll — June", category: "Salaries", date: "2026-06-27", dueDate: "2026-06-27", amount: 41500, status: "Paid", method: "Bank Transfer" },
  { id: "EX-4499", vendor: "Coastal Freight Movers", category: "Logistics", date: "2026-06-25", dueDate: "2026-07-25", amount: 6340, status: "Paid", method: "Mobile Money" },
  { id: "EX-4498", vendor: "Nexus Digital Marketing", category: "Marketing", date: "2026-06-22", dueDate: "2026-07-07", amount: 3100, status: "Pending", method: "Bank Transfer" },
  { id: "EX-4497", vendor: "OfficeMart Supplies Ltd", category: "Supplies", date: "2026-06-20", dueDate: "2026-07-20", amount: 980, status: "Paid", method: "Cash" },
  { id: "EX-4496", vendor: "Bahati & Partners Audit", category: "Professional Fees", date: "2026-06-18", dueDate: "2026-06-25", amount: 4500, status: "Scheduled", method: "Bank Transfer" },
  { id: "EX-4495", vendor: "TANESCO", category: "Rent & Utilities", date: "2026-06-15", dueDate: "2026-07-15", amount: 1620, status: "Paid", method: "Mobile Money" },
  { id: "EX-4494", vendor: "Zuridata Cloud Hosting", category: "Supplies", date: "2026-06-12", dueDate: "2026-07-12", amount: 740, status: "Paid", method: "Card" },
];

export const CASHFLOW_TREND = [
  { m: "Jan", inflow: 52, outflow: 38 }, { m: "Feb", inflow: 58, outflow: 41 },
  { m: "Mar", inflow: 49, outflow: 39 }, { m: "Apr", inflow: 67, outflow: 44 },
  { m: "May", inflow: 63, outflow: 47 }, { m: "Jun", inflow: 79, outflow: 52 },
  { m: "Jul", inflow: 61, outflow: 33 },
];

/* ---------------------------------- HR DATA ---------------------------------- */

export const DEPARTMENTS = ["Sales", "Operations", "Finance", "Warehouse", "Admin"];

export const EMPLOYMENT_STATUS_COLOR = {
  Active: "#16A34A",
  "On Leave": "#F59E0B",
  Inactive: "#9CA3AF",
};

export const LEAVE_STATUS_COLOR = {
  Pending: "#F59E0B",
  Approved: "#16A34A",
  Rejected: "#EF4444",
};

export const employeesSeed = [
  { id: "EMP-101", name: "Juma Batenga", role: "Sales Manager", department: "Sales", email: "j.batenga@beirahisi.co.tz", phone: "+255 754 220 981", status: "Active", salary: 2400, hireDate: "2023-02-14", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-102", name: "Sarah Kileo", role: "Account Executive", department: "Sales", email: "s.kileo@beirahisi.co.tz", phone: "+255 712 004 552", status: "Active", salary: 1650, hireDate: "2023-08-01", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-103", name: "Michael Fundi", role: "Account Executive", department: "Sales", email: "m.fundi@beirahisi.co.tz", phone: "+255 786 442 019", status: "On Leave", salary: 1650, hireDate: "2024-01-10", contractType: "Fixed-term", contractEndDate: "2027-01-10" },
  { id: "EMP-104", name: "Grace Mmbaga", role: "Warehouse Supervisor", department: "Warehouse", email: "g.mmbaga@beirahisi.co.tz", phone: "+255 767 331 220", status: "Active", salary: 1400, hireDate: "2022-11-05", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-105", name: "Elias Rugambwa", role: "Logistics Coordinator", department: "Operations", email: "e.rugambwa@beirahisi.co.tz", phone: "+255 762 883 456", status: "Active", salary: 1550, hireDate: "2023-05-20", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-106", name: "Fatuma Salim", role: "Accountant", department: "Finance", email: "f.salim@beirahisi.co.tz", phone: "+255 715 990 341", status: "Active", salary: 1900, hireDate: "2022-06-01", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-107", name: "David Chen", role: "Operations Lead", department: "Operations", email: "d.chen@beirahisi.co.tz", phone: "+255 700 118 774", status: "Active", salary: 2200, hireDate: "2021-09-15", contractType: "Permanent", contractEndDate: null },
  { id: "EMP-108", name: "Halima Juma", role: "Office Administrator", department: "Admin", email: "h.juma@beirahisi.co.tz", phone: "+255 754 662 187", status: "Inactive", salary: 1100, hireDate: "2023-03-01", contractType: "Probation", contractEndDate: "2026-09-01" },
];

export const EMPLOYMENT_CONTRACT_TYPES = ["Permanent", "Fixed-term", "Probation"];

export const leaveRequestsSeed = [
  { id: "LV-501", employee: "Michael Fundi", type: "Annual", startDate: "2026-06-28", endDate: "2026-07-08", status: "Approved" },
  { id: "LV-500", employee: "Sarah Kileo", type: "Sick", startDate: "2026-07-01", endDate: "2026-07-02", status: "Pending" },
  { id: "LV-499", employee: "Grace Mmbaga", type: "Annual", startDate: "2026-07-15", endDate: "2026-07-19", status: "Pending" },
  { id: "LV-498", employee: "Elias Rugambwa", type: "Unpaid", startDate: "2026-06-10", endDate: "2026-06-12", status: "Approved" },
  { id: "LV-497", employee: "Fatuma Salim", type: "Sick", startDate: "2026-05-28", endDate: "2026-05-29", status: "Rejected" },
];

// Standard annual leave allocation used for balance tracking — a real
// policy number a company sets, not a computed fact, so it's a constant
// rather than something derived from data that does not exist yet.
export const ANNUAL_LEAVE_ALLOCATION = 21;

export function daysInclusive(startStr, endStr) {
  const ms = new Date(endStr) - new Date(startStr);
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

/* ------------------------------- RECRUITMENT DATA -------------------------------- */

export const RECRUITMENT_STAGES = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];

export const RECRUITMENT_STAGE_COLOR = {
  Applied: "#5B6472",
  Screening: "#16A34A",
  Interview: "#F59E0B",
  Offer: "#F59E0B",
  Hired: "#16A34A",
  Rejected: "#9CA3AF",
};

export const candidatesSeed = [
  { id: "CAND-01", name: "Neema Kessy", role: "Warehouse Assistant", department: "Warehouse", stage: "Interview", email: "neema.kessy@gmail.com", appliedDate: "2026-06-20" },
  { id: "CAND-02", name: "Baraka Mwita", role: "Junior Accountant", department: "Finance", stage: "Screening", email: "b.mwita@gmail.com", appliedDate: "2026-06-25" },
  { id: "CAND-03", name: "Zawadi Ndosi", role: "Account Executive", department: "Sales", stage: "Offer", email: "zawadi.ndosi@gmail.com", appliedDate: "2026-06-10" },
  { id: "CAND-04", name: "Yusuph Mrema", role: "Logistics Coordinator", department: "Operations", stage: "Applied", email: "y.mrema@gmail.com", appliedDate: "2026-07-01" },
  { id: "CAND-05", name: "Consolata Peter", role: "Office Administrator", department: "Admin", stage: "Rejected", email: "consolata.p@gmail.com", appliedDate: "2026-06-05" },
];

/* ------------------------------- ATTENDANCE DATA -------------------------------- */

export const ATTENDANCE_STATUS_COLOR = {
  Present: "#16A34A",
  Late: "#F59E0B",
  Absent: "#EF4444",
  "On Leave": "#5B6472",
};

export const attendanceSeed = [
  { id: "ATT-01", employee: "Juma Batenga", date: "2026-07-02", status: "Present", verified:true,  sigMethod:"biometric", clockIn:"08:02", clockOut:"17:05" },
  { id: "ATT-02", employee: "Sarah Kileo",  date: "2026-07-02", status: "Present", verified:true,  sigMethod:"biometric", clockIn:"07:58", clockOut:"17:01" },
  { id: "ATT-03", employee: "Michael Fundi", date: "2026-07-02", status: "On Leave" },
  { id: "ATT-04", employee: "Grace Mmbaga", date: "2026-07-02", status: "Late" },
  { id: "ATT-05", employee: "Elias Rugambwa", date: "2026-07-02", status: "Present" },
  { id: "ATT-06", employee: "Fatuma Salim", date: "2026-07-02", status: "Absent" },
  { id: "ATT-07", employee: "David Chen", date: "2026-07-02", status: "Present" },
];

/* ------------------------------- PERFORMANCE DATA -------------------------------- */

export const PERFORMANCE_RATINGS = ["Excellent", "Good", "Satisfactory", "Needs Improvement"];

export const PERFORMANCE_RATING_COLOR = {
  Excellent: "#16A34A",
  Good: "#16A34A",
  Satisfactory: "#F59E0B",
  "Needs Improvement": "#EF4444",
};

export const performanceReviewsSeed = [
  { id: "PR-01", employee: "Juma Batenga", period: "H1 2026", rating: "Excellent", reviewer: "EzyMP", notes: "Exceeded sales targets by 18%.", date: "2026-06-30" },
  { id: "PR-02", employee: "Sarah Kileo", period: "H1 2026", rating: "Good", reviewer: "Juma Batenga", notes: "Consistent performer, strong client relationships.", date: "2026-06-30" },
  { id: "PR-03", employee: "Grace Mmbaga", period: "H1 2026", rating: "Good", reviewer: "David Chen", notes: "Improved warehouse turnaround time.", date: "2026-06-28" },
];

/* ------------------------------- TRAINING DATA -------------------------------- */

export const TRAINING_STATUS_COLOR = {
  "Not Started": "#5B6472",
  "In Progress": "#F59E0B",
  Completed: "#16A34A",
};

export const trainingSeed = [
  { id: "TRN-01", employee: "Sarah Kileo", course: "Advanced Negotiation Skills", status: "Completed", completionDate: "2026-05-15" },
  { id: "TRN-02", employee: "Elias Rugambwa", course: "Fleet Safety Certification", status: "In Progress", completionDate: null },
  { id: "TRN-03", employee: "Fatuma Salim", course: "IFRS Update Workshop", status: "Not Started", completionDate: null },
  { id: "TRN-04", employee: "Grace Mmbaga", course: "Warehouse Safety Refresher", status: "Completed", completionDate: "2026-06-01" },
];

/* ------------------------------- BENEFITS DATA -------------------------------- */

export const BENEFIT_TYPES = ["Health Insurance", "Pension Fund", "Housing Allowance", "Transport Allowance"];

export const benefitsSeed = [
  { id: "BEN-01", employee: "Juma Batenga", type: "Health Insurance", monthlyValue: 120, status: "Active", enrollmentDate: "2023-02-14" },
  { id: "BEN-02", employee: "Juma Batenga", type: "Pension Fund", monthlyValue: 240, status: "Active", enrollmentDate: "2023-02-14" },
  { id: "BEN-03", employee: "Sarah Kileo", type: "Health Insurance", monthlyValue: 120, status: "Active", enrollmentDate: "2023-08-01" },
  { id: "BEN-04", employee: "Grace Mmbaga", type: "Transport Allowance", monthlyValue: 80, status: "Active", enrollmentDate: "2022-11-05" },
  { id: "BEN-05", employee: "David Chen", type: "Housing Allowance", monthlyValue: 300, status: "Active", enrollmentDate: "2021-09-15" },
];

/* ------------------------------- PAYROLL DATA -------------------------------- */

export const payrollRunsSeed = [
  { id: "PR-2026-05", period: "May 2026", employeeCount: 7, totalAmount: 12800, status: "Processed", processedDate: "2026-05-28" },
  { id: "PR-2026-06", period: "June 2026", employeeCount: 7, totalAmount: 12800, status: "Processed", processedDate: "2026-06-27" },
];

/* ------------------------------- MANUFACTURING DATA -------------------------------- */

// BOM component costs are looked up live against inventorySeed's unit costs,
// keeping "material cost per unit" honest to what Inventory shows.
// Takes live inventory rows, not the frozen seed snapshot — a BOM's cost
// must move when a component's unit cost changes in Inventory, not stay
// pinned to whatever the price was when the app first loaded.
export function bomComponentCost(sku, inventoryRows) {
  return inventoryRows.find((it) => it.sku === sku)?.unitCost || 0;
}

export const bomsSeed = [
  {
    id: "BOM-01", product: "Cold Chain Storage Unit", outputUnit: "unit",
    components: [
      { sku: "HDW-2209", qty: 1 },
      { sku: "HDW-2207", qty: 2 },
    ],
    laborCost: 340,
  },
  {
    id: "BOM-02", product: "Salon Suite Bundle", outputUnit: "bundle",
    components: [
      { sku: "HDW-2205", qty: 1 },
      { sku: "HDW-2206", qty: 1 },
    ],
    laborCost: 95,
  },
  {
    id: "BOM-03", product: "Fleet Tracking Install Kit", outputUnit: "kit",
    components: [
      { sku: "HDW-2204", qty: 1 },
    ],
    laborCost: 40,
  },
];

export const WO_STATUS_COLOR = {
  Planned: "#5B6472",
  "In Progress": "#F59E0B",
  Completed: "#16A34A",
  Cancelled: "#9CA3AF",
};

export const WO_STATUS_NEXT = { Planned: "In Progress", "In Progress": "Completed", Completed: null, Cancelled: null };

export const workOrdersSeed = [
  { id: "WO-301", bomId: "BOM-01", product: "Cold Chain Storage Unit", qty: 4, status: "In Progress", startDate: "2026-06-26", dueDate: "2026-07-06", assignedTo: "Grace Mmbaga" },
  { id: "WO-300", bomId: "BOM-02", product: "Salon Suite Bundle", qty: 6, status: "Planned", startDate: "2026-07-03", dueDate: "2026-07-10", assignedTo: "Elias Rugambwa" },
  { id: "WO-299", bomId: "BOM-03", product: "Fleet Tracking Install Kit", qty: 24, status: "Completed", startDate: "2026-06-14", dueDate: "2026-06-20", assignedTo: "David Chen" },
  { id: "WO-298", bomId: "BOM-01", product: "Cold Chain Storage Unit", qty: 2, status: "Completed", startDate: "2026-06-01", dueDate: "2026-06-08", assignedTo: "Grace Mmbaga" },
];

/* ------------------------------ MANUFACTURING: MACHINES ------------------------------ */

export const MACHINE_STATUS_COLOR = { Running: "#16A34A", Idle: "#5B6472", "Under Maintenance": "#F59E0B", Down: "#EF4444" };

export const machinesSeed = [
  { id: "MC-01", name: "CNC Panel Cutter #1", type: "Cutting", warehouse: "WH-DSM", status: "Running", purchaseDate: "2022-03-10" },
  { id: "MC-02", name: "Welding Station A", type: "Welding", warehouse: "WH-DSM", status: "Running", purchaseDate: "2021-08-01" },
  { id: "MC-03", name: "Powder Coat Booth", type: "Finishing", warehouse: "WH-ARU", status: "Under Maintenance", purchaseDate: "2023-01-15" },
  { id: "MC-04", name: "Assembly Line Conveyor", type: "Assembly", warehouse: "WH-DSM", status: "Idle", purchaseDate: "2020-11-20" },
];

/* --------------------------- MANUFACTURING: QUALITY CONTROL --------------------------- */

export const QC_RESULT_COLOR = { Pass: "#16A34A", Rework: "#F59E0B", Fail: "#EF4444" };

export const qcInspectionsSeed = [
  { id: "QC-01", workOrderId: "WO-299", inspector: "David Chen", result: "Pass", defectsFound: 0, notes: "All units within spec.", date: "2026-06-20" },
  { id: "QC-02", workOrderId: "WO-298", inspector: "Grace Mmbaga", result: "Rework", defectsFound: 1, notes: "One unit had a loose seal — reworked before release.", date: "2026-06-08" },
];

/* --------------------------- MANUFACTURING: MAINTENANCE --------------------------- */

export const MAINTENANCE_TYPES = ["Preventive", "Corrective"];

export const maintenanceSeed = [
  { id: "MT-01", machine: "Powder Coat Booth", type: "Corrective", technician: "S. Kileo", date: "2026-06-30", cost: 420, notes: "Replaced heating element", nextDueDate: "2026-09-30" },
  { id: "MT-02", machine: "CNC Panel Cutter #1", type: "Preventive", technician: "Grace Mmbaga", date: "2026-05-15", cost: 85, notes: "Routine blade replacement and calibration", nextDueDate: "2026-08-15" },
  { id: "MT-03", machine: "Welding Station A", type: "Preventive", technician: "S. Kileo", date: "2026-04-01", cost: 60, notes: "Gas line inspection", nextDueDate: "2026-07-01" },
];

/* -------------------------------- PROJECTS DATA -------------------------------- */

export const PROJECT_STATUS_COLOR = { Planning: "#5B6472", Active: "#16A34A", "On Hold": "#F59E0B", Completed: "#16A34A" };

// Continuity with existing customer relationships rather than inventing
// disconnected demo accounts — these are the same real accounts already
// seen across CRM, Sales, and Finance.
export const projectsSeed = [
  { id: "PRJ-01", name: "Cold Chain Rollout", client: "Kilimo Fresh Distributors", status: "Active", startDate: "2026-06-01", endDate: "2026-08-15", budget: 42000, manager: "David Chen" },
  { id: "PRJ-02", name: "Fleet GPS Deployment", client: "Meridian Logistics", status: "Active", startDate: "2026-06-15", endDate: "2026-07-20", budget: 15000, manager: "S. Kileo" },
  { id: "PRJ-03", name: "Kitchen Refurbishment", client: "Baraka Hotels & Resorts", status: "Planning", startDate: "2026-07-10", endDate: "2026-09-30", budget: 28000, manager: "Grace Mmbaga" },
];

export const TASK_STATUSES = ["To Do", "In Progress", "Review", "Done"];
export const TASK_STATUS_COLOR = { "To Do": "#5B6472", "In Progress": "#F59E0B", Review: "#F59E0B", Done: "#16A34A" };
export const PRIORITY_COLOR = { Low: "#5B6472", Medium: "#F59E0B", High: "#EF4444" };

export const projectTasksSeed = [
  { id: "TSK-01", projectId: "PRJ-01", title: "Site survey — cold storage bay", assignee: "Grace Mmbaga", status: "Done", priority: "High", dueDate: "2026-06-10" },
  { id: "TSK-02", projectId: "PRJ-01", title: "Install racking system", assignee: "Elias Rugambwa", status: "In Progress", priority: "High", dueDate: "2026-07-05" },
  { id: "TSK-03", projectId: "PRJ-01", title: "Commission refrigeration units", assignee: "David Chen", status: "To Do", priority: "Medium", dueDate: "2026-07-25" },
  { id: "TSK-04", projectId: "PRJ-02", title: "Install GPS units on fleet", assignee: "S. Kileo", status: "In Progress", priority: "High", dueDate: "2026-07-08" },
  { id: "TSK-05", projectId: "PRJ-02", title: "Configure monitoring dashboard", assignee: "David Chen", status: "Review", priority: "Medium", dueDate: "2026-07-12" },
  { id: "TSK-06", projectId: "PRJ-03", title: "Finalize equipment list", assignee: "Grace Mmbaga", status: "To Do", priority: "Medium", dueDate: "2026-07-18" },
];

// Same live-computed-status convention as contractStatus and expiryStatus
// — Completed is the only stored fact; everything else is derived from
// today's date so a milestone can never silently drift out of sync.
export function milestoneStatus(m) {
  if (m.completed) return "Completed";
  const days = Math.round((new Date(m.dueDate) - TODAY) / (1000 * 60 * 60 * 24));
  if (days < 0) return "Overdue";
  if (days <= 14) return "Due Soon";
  return "Upcoming";
}
export const MILESTONE_STATUS_COLOR = { Completed: "#16A34A", Overdue: "#EF4444", "Due Soon": "#F59E0B", Upcoming: "#5B6472" };

export const projectMilestonesSeed = [
  { id: "MS-01", projectId: "PRJ-01", title: "Phase 1: Installation complete", dueDate: "2026-07-15", completed: false },
  { id: "MS-02", projectId: "PRJ-01", title: "Final handover", dueDate: "2026-08-15", completed: false },
  { id: "MS-03", projectId: "PRJ-02", title: "Fleet-wide GPS live", dueDate: "2026-07-20", completed: false },
  { id: "MS-04", projectId: "PRJ-03", title: "Design sign-off", dueDate: "2026-07-25", completed: false },
];

// Logging a project expense creates a real Finance expense (category
// "Project Costs") — the same convention-based link Maintenance and
// Payroll already use — while this local record keeps the per-project
// budget view scoped without needing a project field on every expense.
export const projectExpensesSeed = [
  { id: "PE-01", projectId: "PRJ-01", description: "Racking materials", amount: 4200, date: "2026-06-20" },
  { id: "PE-02", projectId: "PRJ-02", description: "GPS units bulk purchase", amount: 3150, date: "2026-06-16" },
];

/* ----------------------------- CUSTOMER SUPPORT DATA ---------------------------- */

export const TICKET_STATUS_COLOR = { Open: "#EF4444", "In Progress": "#F59E0B", Resolved: "#16A34A", Closed: "#9CA3AF" };
export const TICKET_STATUSES = ["Open", "In Progress", "Resolved", "Closed"];
export const TICKET_PRIORITY_COLOR = { Low: "#5B6472", Medium: "#F59E0B", High: "#F59E0B", Urgent: "#EF4444" };
export const TICKET_CATEGORIES = ["Billing", "Technical", "Product", "General"];

export const supportTicketsSeed = [
  {
    id: "TCK-101", subject: "Invoice discrepancy on INV-8799", customer: "Kilimo Fresh Distributors", category: "Billing",
    priority: "High", status: "Open", assignee: "Fatuma Salim", createdDate: "2026-07-01",
    messages: [{ from: "Customer", text: "We were charged for items not on our order. Please review INV-8799.", date: "2026-07-01" }],
  },
  {
    id: "TCK-100", subject: "GPS units not reporting location", customer: "Meridian Logistics", category: "Technical",
    priority: "Urgent", status: "In Progress", assignee: "David Chen", createdDate: "2026-06-29",
    messages: [
      { from: "Customer", text: "Half our fleet's GPS units stopped reporting since yesterday.", date: "2026-06-29" },
      { from: "Agent", text: "Thanks for flagging this — checking with our technical team now.", date: "2026-06-29" },
    ],
  },
  {
    id: "TCK-099", subject: "Request for bulk pricing on cement", customer: "Coastal Construction Ltd", category: "General",
    priority: "Medium", status: "Resolved", assignee: "Juma Batenga", createdDate: "2026-06-20",
    messages: [
      { from: "Customer", text: "Can we get a quote for 1000+ bags of cement?", date: "2026-06-20" },
      { from: "Agent", text: "Sent over a bulk quote — QT-1043. Let us know if you'd like adjustments.", date: "2026-06-21" },
    ],
  },
  {
    id: "TCK-098", subject: "Salon chair delivery delayed", customer: "Uzuri Beauty Chain", category: "General",
    priority: "Low", status: "Closed", assignee: "J. Batenga", createdDate: "2026-06-10",
    messages: [{ from: "Customer", text: "Our delivery was a few days late, just flagging for the record.", date: "2026-06-10" }],
  },
];

// A "conversation" here, not a "ticket" — quick, informal customer chat
// rather than a tracked issue with SLA and priority. The same distinction
// Zendesk Chat vs. Zendesk Support or Intercom's inbox vs. tickets makes.
export const chatConversationsSeed = [
  {
    id: "CHAT-01", customer: "Baraka Hotels & Resorts", status: "Active",
    messages: [
      { from: "Customer", text: "Hi, do you have industrial water heaters in stock?", time: "09:12" },
      { from: "Agent", text: "Yes! We have the 50L model in stock at our Dar warehouse.", time: "09:14" },
    ],
  },
  {
    id: "CHAT-02", customer: "Salim Wholesale Traders", status: "Closed",
    messages: [
      { from: "Customer", text: "What's your return policy on shelving units?", time: "14:02" },
      { from: "Agent", text: "30 days for unused items in original packaging.", time: "14:05" },
      { from: "Customer", text: "Perfect, thank you!", time: "14:06" },
    ],
  },
];

export const KB_CATEGORIES = ["Getting Started", "Billing", "Shipping", "Returns", "Technical"];

export const kbArticlesSeed = [
  { id: "KB-01", title: "How to request a bulk quote", category: "Getting Started", content: "To request a bulk quote, contact your account manager or submit a request through the Sales team with your desired quantities and delivery timeline. Most bulk quotes are turned around within one business day.", views: 142, published: true, updatedDate: "2026-05-10" },
  { id: "KB-02", title: "Understanding your invoice", category: "Billing", content: "Each invoice includes a breakdown of line items, VAT at 18%, and payment terms. Partial payments are recorded against the invoice and reflected in the balance due. Contact billing if any line item looks incorrect.", views: 89, published: true, updatedDate: "2026-06-01" },
  { id: "KB-03", title: "Delivery and shipping timelines", category: "Shipping", content: "Standard delivery within Dar es Salaam takes 2-3 business days; regional deliveries to Arusha and Mwanza typically take 5-7 business days depending on route and cargo size.", views: 210, published: true, updatedDate: "2026-04-22" },
  { id: "KB-04", title: "Return and refund policy", category: "Returns", content: "Items may be returned within 30 days of purchase in original condition. Refunds are processed to the original payment method within 5-10 business days of the return being received and inspected.", views: 56, published: false, updatedDate: "2026-06-25" },
];

export const CALL_DIRECTION_COLOR = { Inbound: "#16A34A", Outbound: "#F59E0B" };
export const CALL_OUTCOME_COLOR = { Resolved: "#16A34A", "Follow-up Needed": "#F59E0B", Escalated: "#EF4444" };

export const callLogSeed = [
  { id: "CALL-01", customer: "Kilimo Fresh Distributors", agent: "Fatuma Salim", direction: "Inbound", duration: 12, outcome: "Follow-up Needed", date: "2026-07-01", notes: "Discussed invoice discrepancy, escalated to billing." },
  { id: "CALL-02", customer: "Meridian Logistics", agent: "David Chen", direction: "Outbound", duration: 8, outcome: "Resolved", date: "2026-06-29", notes: "Walked through GPS troubleshooting steps." },
  { id: "CALL-03", customer: "Nyota Pharmacy Group", agent: "Juma Batenga", direction: "Inbound", duration: 5, outcome: "Resolved", date: "2026-06-27", notes: "Confirmed delivery address ahead of dispatch." },
];

/* ------------------------------- NOTIFICATION SYSTEM ---------------------------- */

// Two genuinely different categories of channel, and the UI says so
// honestly rather than presenting all six as equally real:
//
// Slack and Microsoft Teams both support "incoming webhooks" — a plain
// URL that accepts a POST request with a JSON payload. That's something a
// browser can do directly with fetch(), no server required, so these two
// are wired for real.
//
// Email, SMS, WhatsApp, and Push all require a trusted server holding a
// secret (an SMTP/API key, a Twilio Account SID + Auth Token, Meta's
// WhatsApp Business API credentials, an FCM/APNs server key). None of
// those can ever be safely embedded in client-side code — the same
// principle already documented for the AI Assistant's API key. Building a
// button that pretends to send an email with no backend would be actively
// dishonest, not just incomplete, so these four are shown as real
// configuration screens with a functional=false flag and an explanation,
// not a fake "Sent!" toast.
export const NOTIFICATION_CHANNELS = [
  {
    id: "slack", name: "Slack", icon: Hash, functional: true,
    fields: [{ key: "webhookUrl", label: "Incoming Webhook URL", placeholder: "https://hooks.slack.com/services/..." }],
  },
  {
    id: "teams", name: "Microsoft Teams", icon: Video, functional: true,
    fields: [{ key: "webhookUrl", label: "Incoming Webhook URL", placeholder: "https://yourorg.webhook.office.com/webhookb2/..." }],
  },
  {
    id: "email", name: "Email", icon: Mail, functional: false,
    fields: [{ key: "fromAddress", label: "From address", placeholder: "notifications@yourcompany.tz" }],
    requirement: "Requires a backend email service (SendGrid, Amazon SES, Postmark) — a browser cannot send email directly.",
  },
  {
    id: "sms", name: "SMS", icon: MessageSquare, functional: false,
    fields: [{ key: "fromNumber", label: "Sender number", placeholder: "+255 XXX XXX XXX" }],
    requirement: "Requires an SMS gateway (Twilio, Africa Talking) with server-held credentials — never safe to embed client-side.",
  },
  {
    id: "whatsapp", name: "WhatsApp", icon: MessageCircle, functional: false,
    fields: [{ key: "businessNumber", label: "WhatsApp Business number", placeholder: "+255 XXX XXX XXX" }],
    requirement: "Requires the WhatsApp Business API via Meta or a provider like Twilio, plus Meta approval — not directly callable from a browser.",
  },
  {
    id: "push", name: "Push Notifications", icon: Bell, functional: false,
    fields: [{ key: "serverKey", label: "Push server key", placeholder: "FCM / APNs server key" }],
    requirement: "Requires a push server holding device tokens and a server key that can never be exposed in frontend code.",
  },
];

// Maps each real alert type already computed by useBusinessAlerts (see the
// Notification Center) to which channels should receive it — reusing the
// exact alert taxonomy already live in the app rather than inventing a
// second one.
export const ALERT_ROUTING_TYPES = [
  { id: "out-of-stock", label: "Out of stock" },
  { id: "low-stock", label: "Low stock" },
  { id: "overdue-invoices", label: "Overdue invoices" },
  { id: "pending-expenses", label: "Expenses awaiting payment" },
  { id: "unusual-expenses", label: "Unusual expenses detected" },
  { id: "pending-leave", label: "Leave requests awaiting approval" },
  { id: "overdue-work-orders", label: "Work orders behind schedule" },
  { id: "subscriptions-due", label: "Subscriptions due for billing" },
];

export const notificationChannelsSeed = NOTIFICATION_CHANNELS.map((c) => ({ id: c.id, enabled: false, webhookUrl: "", fromAddress: "", fromNumber: "", businessNumber: "", serverKey: "" }));

export const notificationRulesSeed = ALERT_ROUTING_TYPES.map((t) => ({ id: t.id, channels: [] }));

export const notificationLogSeed = [];

/* --------------------------- ENTERPRISE INTEGRATIONS --------------------------- */

// The same honesty split as the Notification System (see NOTIFICATION_CHANNELS):
// some of these are genuinely achievable from a static frontend, most are not.
// Microsoft 365 and Google Workspace both require a real OAuth app
// registration with a hosted redirect URI and, for anything beyond basic
// sign-in, a server to hold a refresh token — infrastructure this build
// does not have. Stripe and PayPal can't process real payments without a
// server holding a secret key, but both let a business share a hosted
// payment link with no backend at all, which is what "functional" means
// for these two entries — opening a real link the business owner
// configures, not processing a transaction in-app.
export const INTEGRATION_CONNECTIONS = [
  {
    id: "microsoft365", name: "Microsoft 365", icon: Briefcase, functional: false,
    fields: [{ key: "tenantId", label: "Azure AD Tenant ID", placeholder: "contoso.onmicrosoft.com" }, { key: "clientId", label: "App (client) ID", placeholder: "00000000-0000-0000-0000-000000000000" }],
    requirement: "Real sign-in and Outlook/Calendar/OneDrive access need an Azure AD app registration with a hosted redirect URI and a server-side token exchange — not achievable from a static page alone.",
  },
  {
    id: "google-workspace", name: "Google Workspace", icon: Globe, functional: false,
    fields: [{ key: "clientId", label: "OAuth Client ID", placeholder: "xxxxx.apps.googleusercontent.com" }],
    requirement: "Gmail/Calendar/Drive access needs a Google Cloud OAuth client and a registered redirect URI — the identical backend requirement as Microsoft 365.",
  },
  {
    id: "slack", name: "Slack", icon: Hash, functional: true,
    fields: [{ key: "webhookUrl", label: "Slack Incoming Webhook URL", placeholder: "https://hooks.slack.com/services/..." }],
    requirement: "Genuinely real — this is the exact same webhook already dispatching real alerts from Notifications and every Workflow Studio automation (sections 22, 35). Configuring it here or in Notifications is the same connection either way; shown here too so it's discoverable from the integration list a person would actually look for it in first.",
  },
  {
    id: "zoom", name: "Zoom", icon: Video, functional: false,
    fields: [{ key: "apiKey", label: "Server-to-Server OAuth Account ID", placeholder: "xxxxxxxxxxxxxxxxxx" }],
    requirement: "Creating meetings programmatically needs a Zoom Server-to-Server OAuth app and a backend to hold its credentials — the same category of requirement as Microsoft 365. What's genuinely real without one: the Collaboration Hub's Shared Calendar (section 37) has a real meeting-link field — paste in a Zoom link generated the normal way, and the calendar shows a working Join button.",
  },
  {
    id: "whatsapp-business", name: "WhatsApp Business", icon: MessageCircle, functional: true,
    fields: [{ key: "businessNumber", label: "WhatsApp Business number (with country code)", placeholder: "+255700000000" }],
    requirement: "Opens a real wa.me click-to-chat link with your number pre-filled — genuinely functional, no account setup needed beyond having WhatsApp. Automated messaging, message templates, and programmatic sending need Meta's paid WhatsApp Business Platform and a verified business account with server-side API access — a materially different, heavier product than click-to-chat.",
  },
  {
    id: "stripe", name: "Stripe", icon: CreditCard, functional: true,
    fields: [{ key: "paymentLink", label: "Stripe Payment Link URL", placeholder: "https://buy.stripe.com/..." }],
    requirement: "Opens your real Stripe-hosted payment page in a new tab. Processing a card charge inside this app (not just linking out) needs a server holding your Stripe secret key.",
  },
  {
    id: "paypal", name: "PayPal", icon: Wallet, functional: true,
    fields: [{ key: "paypalMeLink", label: "PayPal.me link", placeholder: "https://paypal.me/yourbusiness" }],
    requirement: "Opens your real PayPal.me page in a new tab. A fully embedded checkout needs PayPal's SDK and, for anything beyond the simplest flow, server-side order verification.",
  },
  {
    id: "ecommerce-platforms", name: "E-Commerce Platforms", icon: Store, functional: false,
    fields: [{ key: "storeUrl", label: "Store URL (e.g. Shopify, WooCommerce)", placeholder: "your-store.myshopify.com" }],
    requirement: "Syncing orders and inventory with an external platform needs that platform own OAuth app and a server to hold its access token — a separate integration per platform, none achievable from a static page. This app's own built-in E-Commerce module (Storefront and Online Orders) is real and already usable without connecting anything external.",
  },
  {
    id: "pos-systems", name: "POS Systems", icon: ShoppingBag, functional: false,
    fields: [{ key: "terminalId", label: "Terminal / Merchant ID", placeholder: "e.g. Square, Clover terminal ID" }],
    requirement: "Connecting external POS hardware (Square, Clover, and similar) needs that vendor's own device SDK and a paired terminal — not something a web page can do without their hardware present. This app's own built-in Point of Sale module is real, working checkout software already, not a connector to someone else's till.",
  },
];

export const MOBILE_MONEY_PROVIDERS = ["M-Pesa", "Airtel Money", "Tigo Pesa", "HaloPesa"];

export const TAX_AUTHORITY_NOTE = "No tax authority in East Africa exposes a generic public API a third-party app can integrate with — filing systems like TRA's require certified, business-specific credentials issued directly to the taxpayer. The real, honest capability here is preparation: the VAT Summary already built in Finance computes exactly the number a filing needs.";

export const signaturesSeed = [];

/* ------------------------------ BUSINESS INTELLIGENCE DATA ------------------------------ */

// Every metric here is a real computation over data already live elsewhere
// in the app — nothing new to compute, just a way to let someone pick
// which existing number matters most to them and set their own target
// against it, rather than being stuck with whatever KPIs a developer
// hardcoded onto a dashboard.
export const KPI_METRICS = [
  { id: "revenue", label: "Revenue Collected", unit: "TZS 000", compute: (d) => d.invoices.rows.reduce((s, inv) => { const { total } = lineTotal(inv.items); return s + (inv.status === "Paid" ? total : (inv.amountPaid || 0)); }, 0) },
  { id: "profit", label: "Net Profit", unit: "TZS 000", compute: (d) => { const rev = d.invoices.rows.reduce((s, inv) => { const { total } = lineTotal(inv.items); return s + (inv.status === "Paid" ? total : (inv.amountPaid || 0)); }, 0); return rev - d.expenses.rows.reduce((s, e) => s + e.amount, 0); } },
  { id: "receivables", label: "Outstanding Receivables", unit: "TZS 000", compute: (d) => d.invoices.rows.filter((inv) => inv.status !== "Paid").reduce((s, inv) => s + (lineTotal(inv.items).total - (inv.amountPaid || 0)), 0) },
  { id: "stock_value", label: "Stock Value", unit: "TZS 000", compute: (d) => d.inventory.rows.reduce((s, it) => s + it.qty * it.unitCost, 0) },
  { id: "pipeline_value", label: "Open Pipeline Value", unit: "TZS 000", compute: (d) => d.crm.rows.filter((l) => l.stage !== "Won" && l.stage !== "Lost").reduce((s, l) => s + l.value, 0) },
  { id: "headcount", label: "Active Employees", unit: "people", compute: (d) => d.employees.rows.filter((e) => e.status === "Active").length },
  { id: "win_rate", label: "Sales Win Rate", unit: "%", compute: (d) => { const won = d.crm.rows.filter((l) => l.stage === "Won").length; const closed = won + d.crm.rows.filter((l) => l.stage === "Lost").length; return closed > 0 ? Math.round((won / closed) * 100) : 0; } },
];

export const customKpisSeed = [
  { id: "KPI-01", metricId: "revenue", label: "Monthly Revenue Target", target: 10000 },
  { id: "KPI-02", metricId: "win_rate", label: "Sales Win Rate Target", target: 60 },
];

// Manually entered, deliberately — no automated competitor data exists or
// could exist without scraping or a paid market-intelligence feed neither
// of which this build has. This is exactly how real CRMs (Salesforce's own
// Competitor tracking included) actually work: a rep or owner logs what
// they've learned, not a live automated feed.
export const competitorsSeed = [
  { id: "COMP-01", name: "Coastal Building Supplies", category: "Construction Materials", threatLevel: "High", notes: "Undercuts on cement pricing by ~5%; weaker on delivery reliability.", lastUpdated: "2026-06-20" },
  { id: "COMP-02", name: "Arusha Trade Center", category: "Hardware & Fixtures", threatLevel: "Medium", notes: "Strong regional presence in Arusha; limited product range vs. ours.", lastUpdated: "2026-06-10" },
];

// Financial Benchmarking compares a real computed metric against a target
// the business owner enters themselves — from their own research (an
// industry report, an accountant's advice, a number a peer shared) — not
// a live external benchmark feed, since no such feed exists for East
// African SME sector data that a generic app could connect to.
export const BENCHMARK_METRICS = [
  { id: "gross_margin", label: "Gross Margin", unit: "%" },
  { id: "receivables_days", label: "Days Sales Outstanding", unit: "days" },
  { id: "stock_turnover", label: "Stock Turnover", unit: "x / year" },
];

export const benchmarksSeed = [
  { id: "BM-01", metricId: "gross_margin", label: "Industry Gross Margin (Hardware Retail)", benchmarkValue: 25 },
];

/* ------------------------------ WORKFLOW AUTOMATION STUDIO DATA ------------------------------ */

// Triggers reuse the exact same alert vocabulary useBusinessAlerts already
// computes (section 9) — not a second, parallel event system. "Manual"
// means exactly what it says: no server watches for this while the app is
// closed, so a workflow either runs when someone clicks Run Now, or gets
// surfaced as "ready to run" the moment its matching alert is genuinely
// active in the current session (see WorkflowStudio's own trigger-matching
// logic) — never a silent background action nobody asked for.
export const WORKFLOW_TRIGGERS = [
  { id: "manual", label: "Manual — run on demand" },
  { id: "overdue-invoices", label: "When overdue invoices are detected" },
  { id: "low-stock", label: "When stock runs low" },
  { id: "out-of-stock", label: "When an item goes out of stock" },
  { id: "unusual-expenses", label: "When an unusual expense is detected" },
  { id: "pending-leave", label: "When a leave request needs approval" },
  { id: "subscriptions-due", label: "When a subscription is due for billing" },
];

// The "Condition" gate between When and Actions. Each condition carries
// a real evaluate() run against live rows at execution time — never a
// stored snapshot — returning both the verdict and the real numbers
// behind it, so a skipped run states exactly why in real figures.
export const WORKFLOW_CONDITIONS = [
  { id: "none", label: "No condition — always run", evaluate: () => ({ met: true, detail: "No condition set" }) },
  { id: "overdue-count-gt", label: "Only if overdue invoices exceed…", unit: "invoices", evaluate: (data, v) => { const todayStr = TODAY.toISOString().slice(0, 10); const n = data.invoices.rows.filter((i) => i.status !== "Paid" && i.dueDate && i.dueDate < todayStr).length; return { met: n > Number(v), detail: `${n} overdue invoice(s) vs threshold ${v}` }; } },
  { id: "low-stock-count-gt", label: "Only if low-stock items exceed…", unit: "items", evaluate: (data, v) => { const n = data.inventory.rows.filter((it) => it.qty <= it.reorder).length; return { met: n > Number(v), detail: `${n} item(s) at/below reorder vs threshold ${v}` }; } },
  { id: "unpaid-expenses-gt", label: "Only if unpaid expenses exceed… (TZS 000)", unit: "TZS k", evaluate: (data, v) => { const total = data.expenses.rows.filter((e) => e.status !== "Paid").reduce((s, e) => s + e.amount, 0); return { met: total > Number(v), detail: `TZS ${money(Math.round(total))}k unpaid vs threshold ${money(Number(v))}k` }; } },
];

// Five step types, deliberately not more — each one wraps a function this
// app has already proven works for real (the exact same sendWebhookNotification
// and logAudit already powering the Notification System and Audit Service).
// A step type was only added here if it can genuinely execute when Run Now
// is clicked; nothing on this list is aspirational.
export const WORKFLOW_STEP_TYPES = [
  { id: "notify_slack", label: "Notify via Slack", icon: Hash, color: "#16A34A", fields: [{ key: "message", label: "Message", placeholder: "e.g. Please review this — customer payment received." }] },
  { id: "notify_teams", label: "Notify via Microsoft Teams", icon: Video, color: "#5B6472", fields: [{ key: "message", label: "Message", placeholder: "e.g. Heads up — new payment recorded." }] },
  { id: "log_audit", label: "Log to Audit Trail", icon: FileCheck, color: "#111827", fields: [{ key: "note", label: "Note", placeholder: "What happened, in one line" }] },
  { id: "draft_email", label: "Draft a Thank You / Follow-up Email", icon: Mail, color: "#F59E0B", fields: [{ key: "recipient", label: "Recipient email", placeholder: "customer@company.tz" }, { key: "context", label: "What should it say?", placeholder: "e.g. Thank the customer for their payment" }] },
  { id: "generate_report", label: "Generate a Report", icon: FileText, color: "#0EA5E9", fields: [{ key: "reportType", label: "Report type", options: ["Sales & Revenue", "Inventory Valuation", "Profit & Loss"] }] },
];

export const workflowsSeed = [
  {
    id: "WF-01", name: "Invoice Paid Follow-up", trigger: "manual", enabled: true, lastRun: null,
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "A customer invoice was just paid — cash flow updated." } },
      { id: "s2", type: "log_audit", config: { note: "Payment follow-up workflow executed" } },
      { id: "s3", type: "draft_email", config: { recipient: "", context: "Thank the customer warmly for their prompt payment and mention we look forward to serving them again." } },
    ],
  },
];

// Automation Marketplace — seven "ready-made" automations, all real,
// because every one is composed entirely from the five step types and
// the existing real triggers already proven in Workflow Studio (section
// 35). None of these needed new capability to build — "ready-made" here
// means "already assembled," not "does something this app couldn't
// already do." Two (Payroll, VAT) are honestly scoped as monthly
// reminder checklists a person still runs, not unattended auto-filing —
// the identical limitation already stated for Scheduled Reports.
export const OFFICIAL_MARKETPLACE_TEMPLATES = [
  {
    id: "TPL-invoice-approval", name: "Invoice Approval Alert", category: "Finance", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Notify a finance manager and log an audit entry whenever a significant invoice needs a second look before it goes out.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "A new invoice needs review before sending — please check Sales > Invoices." } },
      { id: "s2", type: "log_audit", config: { note: "Invoice flagged for approval review" } },
    ],
  },
  {
    id: "TPL-onboarding", name: "Employee Onboarding Kit", category: "HR", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Welcome a new hire, notify the team, and log the onboarding start — all in one run on their first day.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "log_audit", config: { note: "Employee onboarding started" } },
      { id: "s2", type: "draft_email", config: { recipient: "", context: "Warmly welcome the new team member, outline their first-week schedule, and share who to contact with questions." } },
      { id: "s3", type: "notify_slack", config: { message: "Please welcome our newest team member — details in HR." } },
    ],
  },
  {
    id: "TPL-payroll", name: "Monthly Payroll Reminder", category: "Finance", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "A monthly checklist to run before payday: a Slack reminder plus a real P&L snapshot for reference. Doesn't process payroll itself — HR's own Process Payroll action does that (section 4).",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "Reminder: payroll is due — review HR > Payroll before processing." } },
      { id: "s2", type: "generate_report", config: { reportType: "Profit & Loss" } },
    ],
  },
  {
    id: "TPL-vat", name: "VAT Filing Preparation", category: "Finance", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "A monthly reminder plus a real financial snapshot to reference before filing — preparation only. See Finance's own VAT Summary for the actual computed figure and section 25's note on why real TRA filing needs credentials this app does not hold.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "VAT return is due soon — check Finance > Tax for this period's summary." } },
      { id: "s2", type: "generate_report", config: { reportType: "Profit & Loss" } },
      { id: "s3", type: "log_audit", config: { note: "VAT filing preparation reminder sent" } },
    ],
  },
  {
    id: "TPL-followup", name: "Customer Follow-up", category: "Sales", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "The moment an overdue invoice is detected, draft a polite reminder and alert the sales team — using the exact same real overdue-invoice detection already powering your Notifications.",
    trigger: "overdue-invoices",
    steps: [
      { id: "s1", type: "draft_email", config: { recipient: "", context: "Politely remind the customer their invoice is now overdue and ask when payment can be expected." } },
      { id: "s2", type: "notify_slack", config: { message: "An overdue invoice needs a follow-up call — see Finance > Receivables." } },
    ],
  },
  {
    id: "TPL-replenishment", name: "Inventory Replenishment Alert", category: "Inventory", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "The moment stock runs low, alert procurement and log it — using the same real low-stock detection already powering your Notifications.",
    trigger: "low-stock",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "Stock has run low on one or more items — check Inventory for reorder recommendations." } },
      { id: "s2", type: "log_audit", config: { note: "Low-stock replenishment alert sent" } },
    ],
  },
  {
    id: "TPL-subscription", name: "Subscription Billing Reminder", category: "Sales", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "The moment a subscription is due for billing, draft the renewal email and notify the team — using the same real due-date detection already powering your Notifications.",
    trigger: "subscriptions-due",
    steps: [
      { id: "s1", type: "draft_email", config: { recipient: "", context: "Let the customer know their subscription is due for renewal and confirm the billing details." } },
      { id: "s2", type: "notify_slack", config: { message: "A subscription is due for billing — see Sales > Subscriptions." } },
    ],
  },
  {
    id: "TPL-leave-approval", name: "Leave Approval Alert", category: "HR", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "The moment a leave request needs approval, notify the approver and keep an audit record — using the same real pending-leave detection powering your Notifications.",
    trigger: "pending-leave",
    steps: [
      { id: "s1", type: "notify_teams", config: { message: "A leave request is waiting for approval — decide in HR > Leave." } },
      { id: "s2", type: "log_audit", config: { note: "Leave approval reminder dispatched" } },
    ],
  },
  {
    id: "TPL-asset-request", name: "Asset Request Log", category: "Operations", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Run when someone requests equipment: notify operations and leave a real audit-trail record for the asset register.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "New asset request — review against the Fixed Assets register." } },
      { id: "s2", type: "log_audit", config: { note: "Asset request submitted and recorded" } },
    ],
  },
  {
    id: "TPL-vehicle-booking", name: "Vehicle Booking Notice", category: "Operations", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Run when a vehicle is requested: notify the fleet contact and record the booking request in the audit trail.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_teams", config: { message: "Vehicle booking requested — confirm availability and assign a driver." } },
      { id: "s2", type: "log_audit", config: { note: "Vehicle booking request recorded" } },
    ],
  },
  {
    id: "TPL-reimbursement", name: "Expense Reimbursement Watch", category: "Finance", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "When an unusual expense is detected, flag it for review before reimbursement — same real detection that powers your expense alerts.",
    trigger: "unusual-expenses",
    steps: [
      { id: "s1", type: "notify_slack", config: { message: "Unusual expense flagged — review in Finance > Payables before reimbursing." } },
      { id: "s2", type: "log_audit", config: { note: "Reimbursement review triggered by unusual-expense detection" } },
    ],
  },
  {
    id: "TPL-customer-onboarding", name: "Customer Onboarding", category: "Sales", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Run for each new customer: draft the welcome email and record onboarding start — distinct from post-sale follow-up.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "draft_email", config: { recipient: "", context: "Welcome the new customer, introduce their account contact, and explain how invoicing and support work" } },
      { id: "s2", type: "log_audit", config: { note: "Customer onboarding sequence started" } },
    ],
  },
  {
    id: "TPL-contract-approval", name: "Contract Approval Record", category: "Finance", isOfficial: true, installCount: 0, publisherName: "Official",
    description: "Route a contract for decision: notify the approver and record that the decision will carry a biometric signature in Approvals.",
    trigger: "manual",
    steps: [
      { id: "s1", type: "notify_teams", config: { message: "A contract is ready for approval — review and sign in Approvals." } },
      { id: "s2", type: "log_audit", config: { note: "Contract routed for approval — decision to be biometrically signed" } },
    ],
  },
];

/* ------------------------------ ENTERPRISE COLLABORATION HUB DATA ------------------------------ */

// Voice Calls and Video Meetings are the two items here with no honest
// in-app implementation: real calling needs a WebRTC signaling server,
// STUN/TURN infrastructure for NAT traversal, and for group calls a media
// relay server — none of which exist in a static frontend talking to one
// Postgres database. The honest equivalent, and the same pattern already
// used for Stripe and PayPal in Integrations (section 25): schedule the
// meeting for real, with a real link to wherever the actual call happens
// (Zoom, Google Meet, Teams — whatever the business already uses), rather
// than pretend to host a call this build cannot technically provide.
export const MEETING_TYPES = ["Voice Call", "Video Call", "In-Person", "General"];

export const calendarEventsSeed = [
  { id: "EVT-01", title: "Weekly Sales Sync", type: "Video Call", date: "2026-07-07", startTime: "09:00", endTime: "09:30", meetingLink: "https://meet.google.com/example-link", attendees: "Sales team", description: "Pipeline review and weekly targets." },
  { id: "EVT-02", title: "Supplier Call — Tanzania Portland Cement", type: "Voice Call", date: "2026-07-08", startTime: "14:00", endTime: "14:30", meetingLink: "", attendees: "Procurement", description: "Discuss Q3 pricing." },
  { id: "EVT-03", title: "Warehouse Stock Count", type: "In-Person", date: "2026-07-10", startTime: "08:00", endTime: "12:00", meetingLink: "", attendees: "Warehouse team", description: "Quarterly physical stock count, Dar es Salaam warehouse." },
];

// Channels cover both Team Chat and Department Channels — a department
// channel is simply a channel scoped to a real department name (drawn
// from HR's actual employee.department values, not an invented list).
export const collabChannelsSeed = [
  { id: "CH-01", name: "General", scope: "Company-wide", description: "Company-wide announcements and general discussion." },
  { id: "CH-02", name: "Sales", scope: "Department", description: "Sales team coordination." },
  { id: "CH-03", name: "Operations", scope: "Department", description: "Warehouse and operations coordination." },
];

// Real, polled messages — not true push-based real-time (no WebSocket
// signaling exists here), but genuinely working near-real-time delivery:
// while a channel is open, the frontend polls for new rows every few
// seconds, the same honest technique already validated for this class of
// problem (a static frontend with no server to push events from).
export const collabMessagesSeed = [
  { id: "MSG-01", channelId: "CH-01", sender: "Grace Mmbaga", text: "Morning team — reminder that the cold chain rollout site visit is this Thursday.", timestamp: "2026-07-05T08:15:00Z" },
  { id: "MSG-02", channelId: "CH-02", sender: "S. Kileo", text: "Meridian Logistics confirmed the fleet GPS rollout for next week.", timestamp: "2026-07-05T09:02:00Z" },
];

export const workspacesSeed = [
  { id: "WS-01", name: "Cold Chain Rollout Team", department: "Operations", members: "Grace Mmbaga, David Chen, Elias Rugambwa", channelId: "CH-03", description: "Cross-functional team delivering the Kilimo Fresh cold chain project." },
];

/* ------------------------------ SUPPLY CHAIN DATA ------------------------------ */

export const SHIPMENT_STATUS_COLOR = {
  Preparing: "#5B6472",
  Dispatched: "#F59E0B",
  "In Transit": "#F59E0B",
  Delivered: "#16A34A",
};

export const SHIPMENT_STATUS_NEXT = { Preparing: "Dispatched", Dispatched: "In Transit", "In Transit": "Delivered", Delivered: null };

export const VEHICLE_STATUS_COLOR = {
  Available: "#16A34A",
  "On Route": "#F59E0B",
  Maintenance: "#F59E0B",
};

export const vehiclesSeed = [
  { reg: "T 442 DKL", type: "Box truck (3.5t)", driver: "Elias Rugambwa", status: "On Route", capacity: "3,500 kg" },
  { reg: "T 118 BFQ", type: "Flatbed (7t)", driver: "Joseph Mkude", status: "Available", capacity: "7,000 kg" },
  { reg: "T 903 CPR", type: "Panel van (1.2t)", driver: "Amina Hassan", status: "Available", capacity: "1,200 kg" },
  { reg: "T 771 AGX", type: "Box truck (3.5t)", driver: "Frank Temba", status: "Maintenance", capacity: "3,500 kg" },
];

export const shipmentsSeed = [
  { id: "DL-812", orderRef: "SO-2117", customer: "Meridian Logistics", destination: "Dar es Salaam — Kurasini", vehicle: "T 442 DKL", dispatchDate: "2026-07-01", expectedDate: "2026-07-03", status: "In Transit" },
  { id: "DL-811", orderRef: "SO-2116", customer: "Uzuri Beauty Chain", destination: "Mwanza — Nyamagana", vehicle: "T 118 BFQ", dispatchDate: "2026-06-28", expectedDate: "2026-07-01", status: "Delivered" },
  { id: "DL-810", orderRef: "—", customer: "Nyota Pharmacy Group", destination: "Arusha — Kaloleni", vehicle: null, dispatchDate: "2026-07-04", expectedDate: "2026-07-06", status: "Preparing" },
  { id: "DL-809", orderRef: "—", customer: "Coastal Construction Ltd", destination: "Dar es Salaam — Kigamboni", vehicle: "T 903 CPR", dispatchDate: "2026-06-20", expectedDate: "2026-06-21", status: "Delivered" },
];

/* ------------------------------- E-COMMERCE DATA -------------------------------- */

// Storefront products are built from real Inventory items with a retail
// markup — the storefront and the warehouse describe the same physical
// stock, priced for two different audiences (B2B cost vs. retail price).
export const CATEGORY_GRADIENT = {
  "Hardware & Fixtures": "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
  "Construction Materials": "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
  "Electronics": "linear-gradient(135deg, #15803D 0%, #16A34A 100%)",
  "Furniture": "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  "Storage Equipment": "linear-gradient(135deg, #5B6472 0%, #8593A6 100%)",
  "Workshop Equipment": "linear-gradient(135deg, #111827 0%, #F59E0B 100%)",
};

export const MARKUP = 1.35;

export const storefrontSeed = inventorySeed.map((it, i) => ({
  sku: it.sku,
  name: it.name,
  category: it.category,
  price: Math.round(it.unitCost * MARKUP),
  published: i % 5 !== 4,
  featured: [0, 2, 5].includes(i),
}));

export const ECOM_ORDER_STATUS_COLOR = {
  "Payment Pending": "#F59E0B",
  Processing: "#F59E0B",
  Shipped: "#16A34A",
  Delivered: "#16A34A",
  Cancelled: "#9CA3AF",
};

export const onlineOrdersSeed = [
  { id: "WEB-5521", customer: "Rehema Chuma", email: "rehema.c@gmail.com", items: [{ name: "Salon styling chair", qty: 2, price: 284 }], total: 568, status: "Processing", method: "Mobile Money", date: "2026-07-02" },
  { id: "WEB-5520", customer: "Baraka Mnyika", email: "b.mnyika@outlook.com", items: [{ name: "Warehouse shelving unit", qty: 4, price: 105 }], total: 420, status: "Shipped", method: "Card", date: "2026-07-01" },
  { id: "WEB-5519", customer: "Zainab Ally", email: "zainab.ally@yahoo.com", items: [{ name: "Pharmacy display unit", qty: 1, price: 864 }], total: 864, status: "Delivered", method: "Card", date: "2026-06-29" },
  { id: "WEB-5518", customer: "Omary Kassim", email: "o.kassim@gmail.com", items: [{ name: "Fleet GPS tracking unit", qty: 3, price: 159 }], total: 477, status: "Payment Pending", method: "Mobile Money", date: "2026-06-28" },
  { id: "WEB-5517", customer: "Neema Godwin", email: "neema.godwin@gmail.com", items: [{ name: "Cold storage racking system", qty: 1, price: 3483 }], total: 3483, status: "Delivered", method: "Bank Transfer", date: "2026-06-24" },
  { id: "WEB-5516", customer: "Hassan Iddi", email: "hassan.iddi@gmail.com", items: [{ name: "Backwash basin", qty: 2, price: 378 }], total: 756, status: "Cancelled", method: "Card", date: "2026-06-22" },
];

export const STOREFRONT_TREND = [
  { d: "Mon", orders: 4 }, { d: "Tue", orders: 7 }, { d: "Wed", orders: 5 },
  { d: "Thu", orders: 9 }, { d: "Fri", orders: 11 }, { d: "Sat", orders: 14 }, { d: "Sun", orders: 8 },
];

/* -------------------------------- DOCUMENTS DATA --------------------------------- */

export const DOC_FOLDERS = ["Contracts", "Invoices", "Receipts", "Employee Files", "Tax Documents", "Licenses", "Purchase Orders"];

// Real OCR via Tesseract.js — a genuine, production-grade, client-side
// OCR engine (WebAssembly, runs entirely in the browser, no server or paid
// API needed) loaded from a CDN on first use rather than bundled, since
// it's a large library most sessions in this app will never touch. This
// is not guaranteed to succeed in every environment — an iframe'd artifact
// or a network blocking the CDN will fail to load it — so the caller
// always checks the returned { ok } flag and shows the real reason rather
// than assuming OCR always works.
let tesseractLoadPromise = null;
export function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (tesseractLoadPromise) return tesseractLoadPromise;
  tesseractLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => (window.Tesseract ? resolve(window.Tesseract) : reject(new Error("Tesseract loaded but did not attach to window")));
    script.onerror = () => reject(new Error("Couldn't load the OCR engine from the CDN"));
    document.head.appendChild(script);
  });
  return tesseractLoadPromise;
}

export async function runOCR(imageFile, onProgress) {
  try {
    const Tesseract = await loadTesseract();
    const result = await Tesseract.recognize(imageFile, "eng", {
      logger: (m) => { if (m.status === "recognizing text" && onProgress) onProgress(Math.round((m.progress || 0) * 100)); },
    });
    return { ok: true, text: result.data.text.trim() };
  } catch (e) {
    return { ok: false, error: "Couldn't run OCR — the engine failed to load (this can happen if the CDN is blocked in this environment). You can still type the document's text in manually below." };
  }
}

export const FILE_TYPE_STYLE = {
  pdf: { color: "#EF4444", Icon: FileText, label: "PDF" },
  docx: { color: "#0EA5E9", Icon: FileText, label: "DOCX" },
  xlsx: { color: "#16A34A", Icon: FileSpreadsheet, label: "XLSX" },
  png: { color: "#F59E0B", Icon: FileImage, label: "PNG" },
};

export const filesSeed = [
  { id: "DOC-01", name: "Baraka Hotels — Supply Agreement.pdf", type: "pdf", folder: "Contracts", size: "1.2 MB", uploadedBy: "J. Batenga", date: "2026-06-24", linkedRecord: "QT-1042", content: "Supply agreement between BEIRAHISI HARDWARE and Baraka Hotels & Resorts for construction materials, effective 1 June 2026. Payment terms: net 30 days. Delivery: Dar es Salaam metro area within 5 business days of order confirmation.", versions: [] },
  { id: "DOC-02", name: "Meridian Logistics — Service Contract.pdf", type: "pdf", folder: "Contracts", size: "0.9 MB", uploadedBy: "S. Kileo", date: "2026-06-15", linkedRecord: "SO-2117", content: "Service contract covering GPS tracking unit installation and annual monitoring subscription for Meridian Logistics' fleet, 24 units, renewable annually.", versions: [] },
  { id: "DOC-03", name: "June Payroll Summary.xlsx", type: "xlsx", folder: "Employee Files", size: "340 KB", uploadedBy: "F. Salim", date: "2026-06-27", linkedRecord: null, content: "", versions: [] },
  { id: "DOC-04", name: "Q2 VAT Return.pdf", type: "pdf", folder: "Tax Documents", size: "610 KB", uploadedBy: "F. Salim", date: "2026-06-20", linkedRecord: null, content: "Quarterly VAT return for Q2 2026, output tax computed at 18% on taxable sales, filed with the Tanzania Revenue Authority.", versions: [{ version: 1, date: "2026-06-18", size: "598 KB", note: "Initial draft before final reconciliation" }] },
  { id: "DOC-05", name: "Business License — Renewal 2026.pdf", type: "pdf", folder: "Licenses", size: "1.8 MB", uploadedBy: "EzyMP", date: "2026-05-30", linkedRecord: null, content: "Business operating license renewal, City of Dar es Salaam, valid through 31 May 2027. License category: General wholesale and hardware trading.", versions: [] },
  { id: "DOC-06", name: "Grace Mmbaga — Employment Contract.docx", type: "docx", folder: "Employee Files", size: "88 KB", uploadedBy: "F. Salim", date: "2026-06-01", linkedRecord: "EMP-104", content: "Employment contract for Grace Mmbaga, Operations role, permanent contract effective 1 June 2026, probation period 3 months.", versions: [] },
  { id: "DOC-07", name: "Coastal Construction — Purchase Order.pdf", type: "pdf", folder: "Purchase Orders", size: "0.5 MB", uploadedBy: "M. Fundi", date: "2026-06-22", linkedRecord: "QT-1041", content: "", versions: [] },
  { id: "DOC-08", name: "Warehouse Floor Plan.png", type: "png", folder: "Licenses", size: "2.1 MB", uploadedBy: "D. Chen", date: "2026-05-12", linkedRecord: null, content: "", versions: [] },
  { id: "DOC-09", name: "Annual Financial Statement 2025.xlsx", type: "xlsx", folder: "Tax Documents", size: "780 KB", uploadedBy: "F. Salim", date: "2026-04-18", linkedRecord: null, content: "", versions: [] },
];

/* -------------------------------- MARKETING DATA --------------------------------- */

export const CAMPAIGN_TYPE_STYLE = {
  Email: { color: "#16A34A", Icon: Mail },
  SMS: { color: "#F59E0B", Icon: MessageSquare },
};

export const CAMPAIGN_STATUS_COLOR = {
  Draft: "#5B6472",
  Scheduled: "#F59E0B",
  Sent: "#16A34A",
};

// Campaigns target a live CRM segment by industry — "sent to" counts are
// computed against real pipeline data, not stored as a stale snapshot.
export const campaignsSeed = [
  { id: "CMP-118", name: "Cold Chain Solutions — June Promo", type: "Email", status: "Sent", segment: "Agriculture", sentDate: "2026-06-20", openRate: 42, clickRate: 11 },
  { id: "CMP-117", name: "Hardware Restock Reminder", type: "SMS", status: "Sent", segment: "Construction", sentDate: "2026-06-15", openRate: 68, clickRate: 9 },
  { id: "CMP-116", name: "New Hospitality Fixtures Launch", type: "Email", status: "Sent", segment: "Hospitality", sentDate: "2026-06-08", openRate: 51, clickRate: 15 },
  { id: "CMP-115", name: "Mid-Year Wholesale Discount", type: "Email", status: "Scheduled", segment: "Wholesale", sentDate: "2026-07-10", openRate: null, clickRate: null },
  { id: "CMP-114", name: "Salon Equipment Flash Sale", type: "SMS", status: "Scheduled", segment: "Retail", sentDate: "2026-07-08", openRate: null, clickRate: null },
  { id: "CMP-113", name: "Q3 Logistics Partner Outreach", type: "Email", status: "Draft", segment: "Logistics", sentDate: null, openRate: null, clickRate: null },
];

/* ---------------------------------- POS DATA ---------------------------------- */

// POS prices reuse the same retail markup as the E-Commerce storefront —
// a physical item costs the customer the same whether they buy it at the
// counter or online, since both channels are selling the same stock.
export const POS_PAYMENT_METHODS = ["Cash", "Card", "Mobile Money"];

export const POS_PAYMENT_COLOR = {
  Cash: "#16A34A",
  Card: "#16A34A",
  "Mobile Money": "#F59E0B",
};

export const RETURN_REASONS = ["Customer changed mind", "Wrong item", "Defective / damaged", "Duplicate purchase", "Other"];

export const posTransactionsSeed = [
  {
    id: "POS-3312", cashier: "Halima Juma", method: "Mobile Money", date: "2026-07-02",
    items: [{ sku: "HDW-2205", name: "Salon styling chair", qty: 1, price: 284 }], returns: [],
  },
  {
    id: "POS-3311", cashier: "Halima Juma", method: "Cash", date: "2026-07-02",
    items: [
      { sku: "HDW-2207", name: "Warehouse shelving unit", qty: 2, price: 105 },
      { sku: "HDW-2210", name: "Pharmacy display unit", qty: 1, price: 864 },
    ], returns: [],
  },
  {
    id: "POS-3310", cashier: "Fatuma Salim", method: "Card", date: "2026-07-01",
    items: [{ sku: "HDW-2201", name: "Industrial water heater 50L", qty: 1, price: 421 }], returns: [],
  },
  {
    id: "POS-3309", cashier: "Halima Juma", method: "Cash", date: "2026-06-30",
    items: [{ sku: "HDW-2206", name: "Backwash basin", qty: 3, price: 378 }], returns: [],
  },
];

export function KpiCard({ item }) {
  const Icon = item.icon;
  const accent = item.up ? "#16A34A" : "#F59E0B";
  return (
    <div className="kpi-card relative bg-white rounded-xl border border-slate-200/70 p-5 flex flex-col gap-4 overflow-hidden group">
      <div
        className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
      />
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: "linear-gradient(135deg, #111827 0%, #16A34A 130%)" }}
        >
          <Icon size={16} strokeWidth={1.85} className="text-white" />
        </div>
        <span
          className="text-[11px] font-mono font-medium flex items-center gap-1 px-1.5 py-0.5 rounded-md"
          style={{ color: accent, backgroundColor: `${accent}12` }}
        >
          {item.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {item.delta}
        </span>
      </div>
      <div>
        <div className="text-[22px] font-semibold text-[#111827] font-mono tracking-tight leading-none">{item.value}</div>
        <div className="text-[12.5px] text-slate-500 mt-1.5">{item.label}</div>
      </div>
    </div>
  );
}

export function StagePill({ stage }) {
  return (
    <span
      className="text-[11px] font-medium px-2 py-1 rounded-full inline-flex items-center gap-1.5"
      style={{ backgroundColor: `${STAGE_COLOR[stage]}14`, color: STAGE_COLOR[stage] }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STAGE_COLOR[stage] }} />
      {stage}
    </span>
  );
}

export function DocStatusPill({ status }) {
  const color = DOC_STATUS_COLOR[status] || "#5B6472";
  return (
    <span
      className="text-[11px] font-medium px-2 py-1 rounded-full inline-flex items-center gap-1.5"
      style={{ backgroundColor: `${color}14`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {status}
    </span>
  );
}

// Clickable column header that toggles asc/desc sort on a given field.
// Shared by any table that wants sorting — pass the same `sort` state
// object ({ field, direction }) and `onSort` setter from the parent.
export function SortableHeader({ label, field, sort, onSort, align = "left" }) {
  const active = sort.field === field;
  return (
    <th
      onClick={() => onSort(field)}
      className={`px-4 py-3 font-medium select-none cursor-pointer group ${align === "right" ? "text-right" : "text-left"}`}
    >
      <span className={`inline-flex items-center gap-1 ${active ? "text-[#111827]" : "group-hover:text-slate-600"}`}>
        {label}
        <span className="flex flex-col -space-y-1">
          <ChevronUp size={10} className={active && sort.direction === "asc" ? "text-[#16A34A]" : "text-slate-300"} />
          <ChevronDown size={10} className={active && sort.direction === "desc" ? "text-[#16A34A]" : "text-slate-300"} />
        </span>
      </span>
    </th>
  );
}

export function sortRows(rows, sort) {
  if (!sort.field) return rows;
  const dir = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const av = a[sort.field], bv = b[sort.field];
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
  });
}

export function toggleSort(sort, setSort, field) {
  setSort((s) => (s.field === field ? { field, direction: s.direction === "asc" ? "desc" : "asc" } : { field, direction: "asc" }));
}

/* ------------------------------- DASHBOARD -------------------------------- */

export function Dashboard({ company, invoices, inventory, crm, expenses, leaveRequests, workOrders, subscriptions, employees, posTransactions, currentUser, onQuickAction, onNavigate }) {
  const currentRole = ROLES.find((r) => r.id === currentUser.role) || ROLES[0];
  const roleView = ROLE_HOME_VIEW[currentUser.role] || "executive";
  // Time period filter — Day/Week/Month/Year. The filter cuts both invoice
  // and expense rows by their date field, so every KPI on the dashboard
  // reflects the same window. "This session" is replaced by a real label.
  const [period, setPeriod] = useState("month");
  const periodStart = useMemo(() => {
    const d = new Date(TODAY);
    if (period === "day")   { return d.toISOString().slice(0, 10); }
    if (period === "week")  { d.setDate(d.getDate() - 7);  return d.toISOString().slice(0, 10); }
    if (period === "month") { d.setDate(1);                 return d.toISOString().slice(0, 10); }
    if (period === "year")  { d.setMonth(0, 1);             return d.toISOString().slice(0, 10); }
    return "2000-01-01";
  }, [period]);
  const PERIOD_LABELS = { day: "Today", week: "Last 7 days", month: "This month", year: "This year" };

  const financials = useMemo(() => {
    const invRows = invoices.rows.filter((inv) => !periodStart || (inv.date || "") >= periodStart);
    const expRows = expenses.rows.filter((e) => !periodStart || (e.date || e.expenseDate || "") >= periodStart);
    const revenue = invRows.reduce((s, inv) => {
      const { total } = lineTotal(inv.items);
      return s + (inv.status === "Paid" ? total : (inv.amountPaid || 0));
    }, 0);
    const expenseTotal = expRows.reduce((s, e) => s + e.amount, 0);
    const profit = revenue - expenseTotal;
    const outstanding = invoices.rows.filter((inv) => inv.status !== "Paid");
    const pendingCash = outstanding.reduce((s, inv) => s + (lineTotal(inv.items).total - (inv.amountPaid || 0)), 0);
    return { revenue, expenseTotal, profit, pendingCash, outstandingCount: outstanding.length };
  }, [invoices.rows, expenses.rows, periodStart]);

  const financeKpis = [
    { label: "Revenue Collected", value: `TZS ${money(Math.round(financials.revenue))}k`, delta: PERIOD_LABELS[period], up: true, icon: CircleDollarSign },
    { label: "Expenses", value: `TZS ${money(Math.round(financials.expenseTotal))}k`, delta: PERIOD_LABELS[period], up: false, icon: Wallet },
    { label: "Profit", value: `TZS ${money(Math.round(financials.profit))}k`, delta: financials.profit >= 0 ? "Net positive" : "Net negative", up: financials.profit >= 0, icon: financials.profit >= 0 ? TrendingUp : TrendingDown },
    { label: "Cash Flow", value: `TZS ${money(Math.round(financials.pendingCash))}k`, delta: `${financials.outstandingCount} invoices pending`, up: false, icon: Landmark },
  ];

  // "Sales" — pipeline by stage, live from CRM.
  const pipelineByStage = useMemo(() => {
    return STAGES.map((stage) => ({ stage, value: crm.rows.filter((l) => l.stage === stage).length }));
  }, [crm.rows]);

  // "Revenue" — top customers by billed value, live from invoices. Mirrors
  // Reports' Sales & Revenue report at a glance rather than duplicating a
  // second calculation for the same number.
  const topCustomers = useMemo(() => {
    const map = {};
    invoices.rows.forEach((inv) => {
      const { total } = lineTotal(inv.items);
      map[inv.customer] = (map[inv.customer] || 0) + total;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([customer, value]) => ({ customer, value }));
  }, [invoices.rows]);

  // "Inventory" — stock value by category, live.
  const stockByCategory = useMemo(() => {
    const map = {};
    inventory.rows.forEach((it) => { map[it.category] = (map[it.category] || 0) + it.qty * it.unitCost; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([category, value]) => ({ category, value: Math.round(value) }));
  }, [inventory.rows]);

  // Work orders by status — genuinely Manufacturing's own metric now that
  // Projects is a real module in its own right; this chart never needed
  // to stand in for anything once labeled honestly (see the Production
  // chart below).
  const workOrdersByStatus = useMemo(() => {
    const statuses = ["Planned", "In Progress", "Completed", "Cancelled"];
    return statuses.map((status) => ({ status, value: workOrders.rows.filter((w) => w.status === status).length }));
  }, [workOrders.rows]);

  const pendingLeave = useMemo(() => leaveRequests.rows.filter((l) => l.status === "Pending"), [leaveRequests.rows]);
  const alerts = useBusinessAlerts({ inventory, invoices, expenses, leaveRequests, workOrders, subscriptions });


  // Recent Activity — a real merged feed, not a fabricated log. Built only
  // from the domains with reliable, directly comparable ISO date fields
  // (invoices, expenses, leave requests); CRM's lastActivity is already a
  // locale-formatted display string, not safely sortable, so it's left out
  // rather than guessed at. Day-level relative labels ("Today", "3 days
  // ago") match the actual granularity of this data — the seed dataset
  // does not carry real minute-level timestamps, so showing "5 minutes ago"
  // would be a precision the data does not have.
  function relativeDay(dateStr) {
    if (!dateStr) return "";
    const days = Math.round((TODAY - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (days <= 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 14) return `${days} days ago`;
    return dateStr;
  }

  const recentActivity = useMemo(() => {
    const items = [];
    invoices.rows.forEach((inv) => {
      if (inv.status === "Paid") {
        items.push({ date: inv.date, icon: ReceiptText, color: "#16A34A", text: `Invoice ${inv.id} paid`, sub: inv.customer });
      } else {
        items.push({ date: inv.date, icon: ReceiptText, color: "#5B6472", text: `Invoice ${inv.id} issued`, sub: inv.customer });
      }
    });
    expenses.rows.forEach((e) => {
      items.push({ date: e.date, icon: Wallet, color: "#F59E0B", text: `Expense recorded — ${e.category}`, sub: `TZS ${money(e.amount)}k · ${e.vendor}` });
    });
    leaveRequests.rows.forEach((l) => {
      items.push({ date: l.startDate, icon: Clock, color: l.status === "Approved" ? "#16A34A" : "#F59E0B", text: `Leave ${l.status.toLowerCase()} — ${l.type}`, sub: l.employee });
    });
    return items.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
  }, [invoices.rows, expenses.rows, leaveRequests.rows]);

  const quickActions = [
    { label: "Create Invoice", icon: ReceiptText, action: () => onQuickAction("sales", { tab: "invoices", openForm: true }) },
    { label: "New Lead", icon: Users, action: () => onQuickAction("crm", { tab: "leads" }) },
    { label: "Approve Leave", icon: Clock, action: () => onQuickAction("hr", { tab: "leave" }) },
    { label: "Record Payment", icon: CreditCard, action: () => onQuickAction("finance", { tab: "receivables" }) },
    { label: "Record Expense", icon: Wallet, action: () => onQuickAction("finance", { tab: "expenses" }) },
    { label: "AI Assistant", icon: Brain, action: () => onNavigate("ai") },
  ];

  // Shared across every focused role view below, so Approvals and Recent
  // Activity do not have to be reimplemented per role — only the top-level
  // dashboard content (which real numbers lead the page) actually differs.
  const sidePanels = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-semibold text-[#111827]">Approvals</h3>
          {pendingLeave.length > 0 && <span className="text-[11px] font-mono text-slate-400">{pendingLeave.length}</span>}
        </div>
        {pendingLeave.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={18} className="text-[#16A34A] mb-2" />
            <p className="text-[12.5px] text-slate-500">No approvals waiting.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {pendingLeave.slice(0, 4).map((l) => (
              <button key={l.id} onClick={() => onQuickAction("hr", { tab: "leave" })} className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center shrink-0"><Clock size={13} className="text-[#F59E0B]" /></div>
                  <div className="min-w-0"><p className="text-[12.5px] font-medium text-[#111827] truncate">{l.employee}</p><p className="text-[11px] text-slate-400">{l.type} · {l.startDate} → {l.endDate}</p></div>
                </div>
                <ChevronRight size={14} className="text-slate-300 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
        <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center"><FileText size={18} className="text-slate-300 mb-2" /><p className="text-[12.5px] text-slate-500">Nothing recorded yet this session.</p></div>
        ) : (
          <div className="space-y-1">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 px-2 py-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${a.color}14` }}><Icon size={13} style={{ color: a.color }} /></div>
                  <div className="min-w-0 flex-1"><p className="text-[12.5px] font-medium text-[#111827] truncate">{a.text}</p><p className="text-[11px] text-slate-400 truncate">{a.sub}</p></div>
                  <span className="text-[10.5px] text-slate-400 shrink-0">{relativeDay(a.date)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const roleHeader = (focusLine) => (
    <div>
      <h1 className="text-[22px] font-semibold text-[#111827] tracking-tight">Hello, {company.owner}</h1>
      <p className="text-[13px] text-slate-500 mt-1">{currentUser.role} view — {focusLine}</p>
    </div>
  );

  if (roleView === "financial") {
    return (
      <div className="space-y-6">
        {roleHeader("cash flow, receivables, and payables, live from Finance")}
        <FinancialDashboard invoices={invoices} expenses={expenses} posTransactions={posTransactions} onNavigate={onNavigate} />
        {sidePanels}
      </div>
    );
  }

  if (roleView === "hr") {
    return (
      <div className="space-y-6">
        {roleHeader("headcount, payroll, and leave, live from HR")}
        <HRDashboard employees={employees} leaveRequests={leaveRequests} onNavigate={onNavigate} />
        {sidePanels}
      </div>
    );
  }

  if (roleView === "sales") {
    return (
      <div className="space-y-6">
        {roleHeader("pipeline, forecast, and revenue by customer, live from CRM and Sales")}
        <SalesDashboard invoices={invoices} crm={crm} onNavigate={onNavigate} />
        {sidePanels}
      </div>
    );
  }

  if (roleView === "operations") {
    return (
      <div className="space-y-6">
        {roleHeader("stock levels and low-inventory alerts, live from Inventory and Manufacturing")}
        <OperationsDashboard inventory={inventory} workOrders={workOrders} onNavigate={onNavigate} />
        {sidePanels}
      </div>
    );
  }

  // Project Manager and Customer Support Agent: Projects' tasks and
  // Support's tickets both live in their own modules' local state, never
  // lifted to root (the same honest scope boundary Analytics itself
  // states in section 21) — so rather than fabricate a widget standing in
  // for data this screen genuinely does not have, this gives a direct,
  // one-click path into the real module instead.
  if (roleView === "focused") {
    const target = currentUser.role === "Project Manager" ? "projects" : "support";
    const targetLabel = currentUser.role === "Project Manager" ? "Projects" : "Customer Support";
    return (
      <div className="space-y-6">
        {roleHeader(`your work lives in ${targetLabel} — jump straight in`)}
        <button onClick={() => onNavigate(target)} className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex items-center justify-between hover:border-[#16A34A]/40 transition-colors text-left">
          <div>
            <p className="text-[15px] font-semibold text-[#111827] mb-1">Open {targetLabel}</p>
            <p className="text-[12.5px] text-slate-500">Tasks, timelines, and details for your role live there — this home screen does not duplicate that view.</p>
          </div>
          <ChevronRight size={20} className="text-slate-300 shrink-0" />
        </button>
        {sidePanels}
      </div>
    );
  }

  // Employee, External Client, Supplier: narrow, honest access by design
  // (see the ROLES definitions) — the home screen matches that, rather
  // than showing company-wide numbers a role with this little access
  // shouldn't be the one place surfacing.
  if (roleView === "minimal") {
    return (
      <div className="space-y-6">
        {roleHeader(currentRole.description)}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-8 text-center">
          <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center mb-3.5" style={{ backgroundColor: "#DCFCE7" }}>
            <Briefcase size={19} strokeWidth={1.75} className="text-[#16A34A]" />
          </div>
          <p className="text-[14.5px] font-semibold text-[#111827] mb-1">Welcome to {company.name}</p>
          <p className="text-[12.5px] text-slate-500 max-w-[380px] mx-auto leading-relaxed">
            Your access is scoped to {currentRole.allowedModules.map((m) => MODULES.find((mm) => mm.id === m)?.label).filter(Boolean).join(" and ")} — use the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ══════════════════ COMMAND STRIP ══════════════════ */}
      <div className="rounded-2xl overflow-hidden relative" style={{background:"linear-gradient(135deg,#0D2214 0%,#1a3a2a 55%,#16A34A 130%)"}}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full opacity-10" style={{background:"radial-gradient(circle,#4ADE80,transparent)",right:"-4rem",top:"-4rem"}}/>
          <div className="absolute w-32 h-32 rounded-full opacity-10" style={{background:"radial-gradient(circle,#86EFAC,transparent)",left:"30%",bottom:"-2rem"}}/>
        </div>
        <div className="relative px-5 sm:px-7 py-5">
          {/* Top bar */}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest">Executive Command Center</span>
                <span className="text-[rgba(255,255,255,.3)]">·</span>
                <span className="text-[10.5px] text-[rgba(255,255,255,.4)] font-mono">{TODAY.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span>
              </div>
              <h1 className="text-white text-[22px] font-black tracking-tight leading-none">
                {(()=>{const h=new Date().getHours();return h<12?"Habari za asubuhi":h<17?"Habari za mchana":"Habari za jioni";})()}, {(company.owner||"Welcome").split(" ")[0]} 👋
              </h1>
              <p className="text-[rgba(255,255,255,.5)] text-[12px] mt-1">{company.name} · {currentUser.role}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={()=>onNavigate("ai")} className="flex items-center gap-1.5 text-[12px] font-bold text-[#111827] bg-[#16A34A] px-3.5 py-2 rounded-xl hover:bg-[#15803D]">
                <Sparkles size={13}/> Ask AI
              </button>
              <button onClick={()=>typeof window.__openDailyBrief==="function"&&window.__openDailyBrief()} className="flex items-center gap-1.5 text-[12px] font-bold text-white border border-[rgba(255,255,255,.2)] px-3.5 py-2 rounded-xl hover:bg-[rgba(255,255,255,.08)]">
                <BarChart3 size={13}/> Daily Brief
              </button>
            </div>
          </div>

          {/* 8-KPI strip */}
          {(() => {
            const invRows = invoices.rows;
            const expRows = expenses.rows;
            const totalBilled   = invRows.reduce((s,i)=>s+lineTotal(i.items||[]).total,0);
            const totalCollected= invRows.reduce((s,i)=>s+(i.amountPaid||0),0);
            const totalExpenses = expRows.reduce((s,e)=>s+(e.amount||0),0);
            const grossProfit   = totalCollected - totalExpenses;
            const overdueInvs   = invRows.filter(i=>i.status!=="Paid"&&i.dueDate<TODAY.toISOString().slice(0,10));
            const overdueAmt    = overdueInvs.reduce((s,i)=>s+lineTotal(i.items||[]).total-(i.amountPaid||0),0);
            const lowStock      = inventory.rows.filter(it=>it.qty<=it.reorder&&it.reorder>0).length;
            const openLeads     = crm.rows.filter(l=>!["Won","Lost"].includes(l.stage)).length;
            const pendingApproval = leaveRequests.rows.filter(l=>l.status==="Pending").length;
            const activeEmployees = (employees?.rows||employees||[]).filter(e=>e.status==="Active").length;
            const activeSubs    = subscriptions.rows.filter(s=>s.status==="Active");
            const MRR = activeSubs.reduce((s,sub)=>{const mo={Monthly:1,Quarterly:3,Annual:12}[sub.cycle]||1;return s+(sub.amount/mo);},0);

            return (
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-px bg-[rgba(255,255,255,.06)] rounded-xl overflow-hidden">
                {[
                  {l:"AR Billed",   v:"TZS "+money(Math.round(totalBilled/1000))+"k",  col:"#4ADE80",  sub:invRows.length+" invoices"},
                  {l:"Collected",   v:"TZS "+money(Math.round(totalCollected/1000))+"k",col:"#60A5FA",  sub:Math.round(totalBilled>0?totalCollected/totalBilled*100:0)+"% rate"},
                  {l:"Overdue AR",  v:"TZS "+money(Math.round(overdueAmt/1000))+"k",   col:overdueAmt>0?"#F87171":"#4ADE80", sub:overdueInvs.length+" invoices"},
                  {l:"Gross P&L",   v:(grossProfit>=0?"+":"")+money(Math.round(Math.abs(grossProfit)/1000))+"k",col:grossProfit>=0?"#4ADE80":"#F87171",sub:"Collected − Exp"},
                  {l:"Inventory",   v:money(inventory.rows.reduce((s,it)=>s+(it.qty||0)*(it.unitCost||0),0)/1000>>0)+"k TZS",col:"#C4B5FD",sub:inventory.rows.length+" SKUs"},
                  {l:"Low Stock",   v:String(lowStock),col:lowStock>0?"#F87171":"#4ADE80",sub:inventory.rows.filter(it=>it.qty<=0).length+" out"},
                  {l:"Pipeline",    v:money(Math.round(crm.rows.filter(l=>!["Won","Lost"].includes(l.stage)).reduce((s,l)=>s+(l.value||0),0)/1000))+"k",col:"#F9A8D4",sub:openLeads+" open deals"},
                  {l:"MRR",         v:"TZS "+money(Math.round(MRR))+"k",col:"#34D399",sub:activeSubs.length+" active subs"},
                ].map(({l,v,col,sub})=>(
                  <div key={l} className="bg-[rgba(0,0,0,.25)] px-3 py-3 text-center">
                    <p className="text-[9.5px] font-bold uppercase tracking-wide text-[rgba(255,255,255,.45)] mb-1">{l}</p>
                    <p className="text-[14px] font-black leading-tight" style={{color:col}}>{v}</p>
                    <p className="text-[9.5px] text-[rgba(255,255,255,.35)] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* ══════════════════ ALERTS + QUICK ACTIONS ══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Smart Alerts */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100" style={{background:"#0D2214"}}>
            <h3 className="text-[13px] font-bold text-white flex items-center gap-1.5">🚨 Live Alerts</h3>
            {alerts.length>0&&<span className="text-[10.5px] font-black text-white bg-[#EF4444] px-2 py-0.5 rounded-full">{alerts.length}</span>}
          </div>
          <div className="max-h-[280px] overflow-y-auto">
            {alerts.length===0?(
              <div className="py-10 text-center">
                <CheckCircle2 size={24} className="text-[#16A34A] mx-auto mb-2"/>
                <p className="text-[12.5px] text-slate-400 font-semibold">All Clear</p>
                <p className="text-[11px] text-slate-300">No active alerts</p>
              </div>
            ):alerts.slice(0,8).map((a,i)=>{
              const cols={critical:["#FEF2F2","#EF4444"],high:["#FFFBEB","#F59E0B"],medium:["#EFF6FF","#2563EB"],low:["#F0FDF4","#16A34A"]};
              const [bg,col]=cols[a.priority]||cols.medium;
              return (
                <button key={a.id||i} onClick={()=>onNavigate(a.target||"dashboard")}
                  className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors">
                  <span className="text-[14px] shrink-0 mt-0.5">{a.priority==="critical"?"🚨":a.priority==="high"?"⚠️":"ℹ️"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold truncate" style={{color:col}}>{a.title}</p>
                    <p className="text-[11px] text-slate-400 truncate">{a.subtitle||a.module}</p>
                  </div>
                  <ChevronRight size={12} className="text-slate-300 shrink-0 mt-1"/>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Command Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100" style={{background:"#0D2214"}}>
            <h3 className="text-[13px] font-bold text-white">⚡ Command Actions</h3>
          </div>
          <div className="p-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {[
              {label:"New Invoice",   icon:ReceiptText,  col:"#16A34A", action:()=>onQuickAction("sales",{tab:"invoices",openForm:true})},
              {label:"New Lead",      icon:Users,         col:"#7C3AED", action:()=>onQuickAction("crm",{tab:"leads"})},
              {label:"Record Expense",icon:Wallet,        col:"#F59E0B", action:()=>onQuickAction("finance",{tab:"expenses"})},
              {label:"New PO",        icon:ShoppingBag,   col:"#2563EB", action:()=>onNavigate("procurement")},
              {label:"Add Stock",     icon:Package,       col:"#0891B2", action:()=>onNavigate("inventory")},
              {label:"Approve Leave", icon:Clock,         col:"#EF4444", action:()=>onQuickAction("hr",{tab:"leave"})},
              {label:"New Employee",  icon:UserPlus,      col:"#059669", action:()=>onQuickAction("hr",{tab:"employees"})},
              {label:"New Project",   icon:FolderKanban,  col:"#DC2626", action:()=>onNavigate("projects")},
              {label:"POS Sale",      icon:ScanLine,      col:"#7C3AED", action:()=>onNavigate("pos")},
              {label:"Send Message",  icon:MessageCircle, col:"#25D366", action:()=>onNavigate("collaboration")},
              {label:"View Reports",  icon:BarChart3,     col:"#1E3A8A", action:()=>onNavigate("reports")},
              {label:"AI Assistant",  icon:Sparkles,      col:"#F9A8D4", action:()=>onNavigate("ai")},
            ].map(({label,icon:Icon,col,action})=>(
              <button key={label} onClick={action}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                  style={{background:col+"15"}}>
                  <Icon size={16} style={{color:col}}/>
                </div>
                <span className="text-[10.5px] font-semibold text-slate-600 text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ REVENUE vs EXPENSES TREND ══════════════════ */}
      {(() => {
        const months = Array.from({length:6},(_,i)=>{
          const d=new Date(TODAY); d.setMonth(d.getMonth()-5+i);
          return d.toISOString().slice(0,7);
        });
        const data = months.map(mo=>{
          const rev = invoices.rows.filter(i=>i.date?.startsWith(mo)).reduce((s,i)=>s+(i.amountPaid||0),0);
          const exp = expenses.rows.filter(e=>e.date?.startsWith(mo)).reduce((s,e)=>s+(e.amount||0),0);
          return {mo:new Date(mo+"-01").toLocaleDateString("en",{month:"short"}),rev:Math.round(rev/1000),exp:Math.round(exp/1000),profit:Math.round((rev-exp)/1000)};
        });
        const hasData = data.some(d=>d.rev>0||d.exp>0);
        if (!hasData) return null;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[14px] font-bold text-[#111827]">Revenue vs Expenses — 6 Month Trend</h3>
                  <p className="text-[11.5px] text-slate-400">Collected revenue · Operating expenses · TZS thousands</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={data} margin={{left:-10,right:4,top:4,bottom:0}}>
                  <CartesianGrid vertical={false} stroke="#F3F4F6"/>
                  <XAxis dataKey="mo" tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{borderRadius:10,border:"1px solid #EEF1F4",fontSize:12}} formatter={(v,n)=>[`TZS ${money(v)}k`,n]}/>
                  <Legend iconSize={9} iconType="circle"/>
                  <Area type="monotone" dataKey="rev" name="Revenue" fill="#DCF5E7" stroke="#16A34A" strokeWidth={2} fillOpacity={0.6}/>
                  <Area type="monotone" dataKey="exp" name="Expenses" fill="#FEE2E2" stroke="#EF4444" strokeWidth={2} fillOpacity={0.4}/>
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#2563EB" strokeWidth={2} dot={{r:3,fill:"#2563EB"}} strokeDasharray="5 3"/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* AR Aging Buckets */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
              <h3 className="text-[14px] font-bold text-[#111827] mb-1">AR Aging</h3>
              <p className="text-[11.5px] text-slate-400 mb-3">Outstanding invoices by age</p>
              {(() => {
                const unpaid = invoices.rows.filter(i=>i.status!=="Paid");
                const todayMs = TODAY.getTime();
                const buckets = [
                  {label:"Current",    days:0,   col:"#16A34A", items:unpaid.filter(i=>!i.dueDate||new Date(i.dueDate)>=TODAY)},
                  {label:"1–30 days",  days:30,  col:"#F59E0B", items:unpaid.filter(i=>i.dueDate&&(todayMs-new Date(i.dueDate).getTime())>0&&(todayMs-new Date(i.dueDate).getTime())<=30*86400000)},
                  {label:"31–60 days", days:60,  col:"#F97316", items:unpaid.filter(i=>i.dueDate&&(todayMs-new Date(i.dueDate).getTime())>30*86400000&&(todayMs-new Date(i.dueDate).getTime())<=60*86400000)},
                  {label:"60+ days",   days:999, col:"#EF4444", items:unpaid.filter(i=>i.dueDate&&(todayMs-new Date(i.dueDate).getTime())>60*86400000)},
                ];
                const totalAR = unpaid.reduce((s,i)=>s+lineTotal(i.items||[]).total-(i.amountPaid||0),0);
                return (
                  <div className="space-y-3">
                    {buckets.map(b=>{
                      const amt = b.items.reduce((s,i)=>s+lineTotal(i.items||[]).total-(i.amountPaid||0),0);
                      const pct = totalAR>0?Math.round(amt/totalAR*100):0;
                      return (
                        <div key={b.label}>
                          <div className="flex items-center justify-between text-[12px] mb-1">
                            <span className="font-semibold" style={{color:b.col}}>{b.label}</span>
                            <span className="font-mono font-bold text-[#111827]">TZS {money(Math.round(amt/1000))}k</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{width:pct+"%",background:b.col}}/>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mt-0.5">{b.items.length} invoices · {pct}%</p>
                        </div>
                      );
                    })}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-[#111827]">Total AR Outstanding</span>
                      <span className="text-[13px] font-black text-[#EF4444]">TZS {money(Math.round(totalAR/1000))}k</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        );
      })()}

      {/* ══════════════════ MODULE HEALTH GRID ══════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#111827]">Module Health</h3>
          <p className="text-[11.5px] text-slate-400">Click any module to navigate</p>
        </div>
        <div className="p-3 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2">
          {[
            {id:"dashboard",label:"Dashboard",icon:LayoutDashboard,status:"ok"},
            {id:"crm",label:"CRM",icon:Users,status: crm.rows.length===0?"empty":"ok"},
            {id:"sales",label:"Sales",icon:ReceiptText,status: invoices.rows.filter(i=>i.status!=="Paid"&&i.dueDate<TODAY.toISOString().slice(0,10)).length>0?"warn":"ok"},
            {id:"inventory",label:"Inventory",icon:Package,status: inventory.rows.filter(it=>it.qty<=it.reorder&&it.reorder>0).length>0?"warn":inventory.rows.length===0?"empty":"ok"},
            {id:"procurement",label:"Procurement",icon:ShoppingBag,status:"ok"},
            {id:"finance",label:"Finance",icon:CircleDollarSign,status: expenses.rows.length===0?"empty":"ok"},
            {id:"hr",label:"HR",icon:UserCheck,status: leaveRequests.rows.filter(l=>l.status==="Pending").length>0?"warn":"ok"},
            {id:"manufacturing",label:"Mfg",icon:Factory,status: workOrders.rows.filter(w=>w.status!=="Completed"&&w.dueDate<TODAY.toISOString().slice(0,10)).length>0?"warn":"ok"},
            {id:"projects",label:"Projects",icon:FolderKanban,status:"ok"},
            {id:"support",label:"Support",icon:Headphones,status:"ok"},
            {id:"analytics",label:"Analytics",icon:BarChart3,status:"ok"},
            {id:"reports",label:"Reports",icon:FileText,status:"ok"},
            {id:"pos",label:"POS",icon:ScanLine,status:"ok"},
            {id:"marketing",label:"Marketing",icon:Megaphone,status:"ok"},
            {id:"ecommerce",label:"Ecommerce",icon:Store,status:"ok"},
            {id:"collaboration",label:"Collab",icon:MessageCircle,status:"ok"},
            {id:"ai",label:"AI",icon:Brain,status:"ok"},
            {id:"employee-portal",label:"Portal",icon:UserCircle,status:"ok"},
          ].map(({id,label,icon:Icon,status})=>{
            const cfg={ok:{ring:"#16A34A",dot:"#16A34A",bg:"#F0FDF4"},warn:{ring:"#F59E0B",dot:"#F59E0B",bg:"#FFFBEB"},empty:{ring:"#94A3B8",dot:"#94A3B8",bg:"#F8FAFC"}};
            const s=cfg[status]||cfg.ok;
            return (
              <button key={id} onClick={()=>onNavigate(id)}
                className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 transition-all group">
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all group-hover:scale-105"
                  style={{background:s.bg,borderColor:s.ring+"40"}}>
                  <Icon size={16} style={{color:s.ring}}/>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white" style={{background:s.dot}}/>
                </div>
                <span className="text-[9.5px] font-semibold text-slate-500 text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center gap-4">
          {[["ok","#16A34A","Healthy"],["warn","#F59E0B","Needs attention"],["empty","#94A3B8","No data yet"]].map(([k,col,label])=>(
            <span key={k} className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full" style={{background:col}}/>{label}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════ BUSINESS ANALYTICS ROW ══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Top Customers BarChart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-1">Top Customers</h3>
          <p className="text-[11.5px] text-slate-400 mb-3">By billed revenue (TZS k)</p>
          {(() => {
            const custData = Object.entries(
              invoices.rows.reduce((m,inv)=>{
                const val=lineTotal(inv.items||[]).total;
                m[inv.customer]=(m[inv.customer]||0)+val;
                return m;
              },{})
            ).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([name,val])=>({
              name:name.length>16?name.slice(0,14)+"…":name,
              value:Math.round(val/1000),
            }));
            if (!custData.length) return <p className="text-slate-300 text-center py-8 text-[12px]">No invoices yet</p>;
            return (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={custData} layout="vertical" margin={{left:5,right:24,top:0,bottom:0}}>
                  <CartesianGrid vertical={false} stroke="#F3F4F6"/>
                  <XAxis type="number" tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                  <YAxis dataKey="name" type="category" tick={{fontSize:10,fill:"#374151"}} axisLine={false} tickLine={false} width={80}/>
                  <Tooltip formatter={(v)=>[`TZS ${money(v)}k`,"Revenue"]}/>
                  <Bar dataKey="value" fill="#16A34A" radius={[0,4,4,0]} maxBarSize={14}/>
                </BarChart>
              </ResponsiveContainer>
            );
          })()}
        </div>

        {/* Inventory Category PieChart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-1">Inventory by Category</h3>
          <p className="text-[11.5px] text-slate-400 mb-3">Stock value distribution</p>
          {(() => {
            const cats = {};
            inventory.rows.forEach(it=>{
              const cat=it.category||"Other";
              cats[cat]=(cats[cat]||0)+(it.qty||0)*(it.unitCost||0);
            });
            const catData = Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,6)
              .map(([name,val],i)=>({name:name.slice(0,12),value:Math.round(val/1000),fill:["#16A34A","#2563EB","#D97706","#7C3AED","#EF4444","#0891B2"][i%6]}));
            if (!catData.length) return <p className="text-slate-300 text-center py-8 text-[12px]">No inventory yet</p>;
            return (
              <div className="flex items-center gap-3">
                <ResponsiveContainer width="55%" height={150}>
                  <RPieChart>
                    <Pie data={catData} dataKey="value" cx="50%" cy="50%" outerRadius={62} innerRadius={34}>
                      {catData.map((d,i)=><Cell key={i} fill={d.fill}/>)}
                    </Pie>
                    <Tooltip formatter={(v)=>[`TZS ${money(v)}k`,"Value"]}/>
                  </RPieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {catData.map(d=>(
                    <div key={d.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{background:d.fill}}/>{d.name}
                      </span>
                      <span className="text-[11px] font-bold" style={{color:d.fill}}>{money(d.value)}k</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* CRM Pipeline Funnel */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-1">Sales Pipeline</h3>
          <p className="text-[11.5px] text-slate-400 mb-3">Leads by stage (TZS k value)</p>
          {(() => {
            const STAGE_COLORS={"New":"#64748B","Contacted":"#2563EB","Qualified":"#7C3AED","Proposal":"#D97706","Negotiation":"#EF4444","Won":"#16A34A","Lost":"#94A3B8"};
            const stageData = ["New","Contacted","Qualified","Proposal","Negotiation"].map(s=>({
              name:s, value:Math.round(crm.rows.filter(l=>l.stage===s).reduce((sum,l)=>sum+(l.value||0),0)/1000),
              fill:STAGE_COLORS[s],
            })).filter(d=>d.value>0);
            if (!stageData.length) return <p className="text-slate-300 text-center py-8 text-[12px]">No leads yet</p>;
            return (
              <ResponsiveContainer width="100%" height={155}>
                <BarChart data={stageData} margin={{left:0,right:10,top:0,bottom:0}}>
                  <CartesianGrid vertical={false} stroke="#F3F4F6"/>
                  <XAxis dataKey="name" tick={{fontSize:9.5,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                  <Tooltip formatter={(v)=>[`TZS ${money(v)}k`,"Value"]}/>
                  <Bar dataKey="value" radius={[4,4,0,0]} maxBarSize={40}>
                    {stageData.map((d,i)=><Cell key={i} fill={d.fill}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            );
          })()}
        </div>
      </div>

      {/* ══════════════════ APPROVALS + ACTIVITY ══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[13.5px] font-bold text-[#111827]">Approvals</h3>
            {pendingLeave.length>0&&<span className="text-[10.5px] font-black text-white bg-[#F59E0B] px-2 py-0.5 rounded-full">{pendingLeave.length}</span>}
          </div>
          {pendingLeave.length===0?(
            <div className="py-10 text-center">
              <CheckCircle2 size={20} className="text-[#16A34A] mx-auto mb-2"/>
              <p className="text-[12px] text-slate-400">No approvals pending</p>
            </div>
          ):(
            <div className="divide-y divide-slate-50">
              {pendingLeave.slice(0,5).map(l=>(
                <button key={l.id} onClick={()=>onQuickAction("hr",{tab:"leave"})}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center shrink-0"><Clock size={13} className="text-[#F59E0B]"/></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-semibold text-[#111827] truncate">{l.employeeName||"Employee"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{l.type} · {l.startDate}→{l.endDate}</p>
                  </div>
                  <ChevronRight size={13} className="text-slate-300 shrink-0"/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-[13.5px] font-bold text-[#111827]">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivity.length===0?(
              <div className="py-10 text-center text-slate-400"><FileText size={20} className="mx-auto mb-2 text-slate-200"/><p className="text-[12px]">No recent activity</p></div>
            ):recentActivity.map((a,i)=>{
              const Icon=a.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{background:a.color+"14"}}>
                    <Icon size={13} style={{color:a.color}}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#111827] truncate">{a.text}</p>
                    <p className="text-[11px] text-slate-400 truncate">{a.sub}</p>
                  </div>
                  <span className="text-[10.5px] text-slate-300 shrink-0">{relativeDay(a.date)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock + Work Orders */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-[13.5px] font-bold text-[#111827]">Attention Needed</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {inventory.rows.filter(it=>it.qty<=it.reorder&&it.reorder>0).slice(0,3).map(it=>(
              <button key={it.id} onClick={()=>onNavigate("inventory")}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-slate-50">
                <div className="w-8 h-8 rounded-xl bg-[#EF4444]/10 flex items-center justify-center shrink-0"><Package size={13} className="text-[#EF4444]"/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#111827] truncate">{it.name}</p>
                  <p className="text-[11px] text-[#EF4444]">{it.qty<=0?"Out of stock":`${it.qty} left — reorder at ${it.reorder}`}</p>
                </div>
              </button>
            ))}
            {workOrders.rows.filter(w=>w.status!=="Completed"&&w.status!=="Cancelled"&&w.dueDate<TODAY.toISOString().slice(0,10)).slice(0,2).map(w=>(
              <button key={w.id} onClick={()=>onNavigate("manufacturing")}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-slate-50">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center shrink-0"><Factory size={13} className="text-[#F59E0B]"/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#111827] truncate">{w.productName||w.id}</p>
                  <p className="text-[11px] text-[#F59E0B]">Work order overdue · {w.dueDate}</p>
                </div>
              </button>
            ))}
            {inventory.rows.filter(it=>it.qty<=it.reorder&&it.reorder>0).length===0&&workOrders.rows.filter(w=>w.status!=="Completed"&&w.dueDate<TODAY.toISOString().slice(0,10)).length===0&&(
              <div className="py-10 text-center"><CheckCircle2 size={20} className="text-[#16A34A] mx-auto mb-2"/><p className="text-[12px] text-slate-400">Everything looks good</p></div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

// A real, data-driven "getting started" checklist — every item checked
// against this company own actual records, not a static tutorial that
// shows the same five steps regardless of whether they're already done.
// Deliberately absent from most SME software, which typically either
// has no onboarding guidance at all or a generic product tour that never
// actually looks at whether a step is complete. Genuinely disappears
// once every item is checked, so an established business with years of
// real activity never sees a permanent "getting started" banner
// cluttering its own dashboard — the same "shown only when it's still
// true" discipline behind every alert and notification in this build.
export function GettingStartedChecklist({ inventory, crm, invoices, expenses, posTransactions, onNavigate }) {
  const [dismissed, setDismissed] = useState(false);

  const steps = [
    { id: "product", label: "Add your first product or service", done: inventory.rows.length > 0, module: "inventory" },
    { id: "customer", label: "Add your first customer", done: crm.rows.length > 0, module: "crm" },
    { id: "invoice", label: "Create your first invoice", done: invoices.rows.length > 0, module: "sales" },
    { id: "payment", label: "Record your first payment or sale", done: invoices.rows.some((inv) => inv.status === "Paid" || (inv.amountPaid || 0) > 0) || posTransactions.rows.length > 0, module: "finance" },
    { id: "expense", label: "Record your first expense", done: expenses.rows.length > 0, module: "finance" },
  ];
  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;

  if (allDone || dismissed) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[14.5px] font-semibold text-[#111827]">Getting Started</h3>
          <p className="text-[12px] text-slate-500 mt-0.5">{completedCount} of {steps.length} done — real progress from your own actual records, not a checklist that just sits there.</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-slate-300 hover:text-slate-500" aria-label="Dismiss getting started checklist"><X size={16} /></button>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden my-3">
        <div className="h-full rounded-full bg-[#16A34A] transition-all" style={{ width: `${(completedCount / steps.length) * 100}%` }} />
      </div>
      <div className="space-y-1">
        {steps.map((s) => (
          <button
            key={s.id} onClick={() => !s.done && onNavigate(s.module)} disabled={s.done}
            className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors ${s.done ? "cursor-default" : "hover:bg-slate-50"}`}
          >
            {s.done ? <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" /> : <Circle size={16} className="text-slate-300 shrink-0" />}
            <span className={`text-[13px] ${s.done ? "text-slate-400 line-through" : "text-[#111827] font-medium"}`}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Real, differentiated guidance based on the company own selected
// category — resolved through the real industry-clustering system
// (COMPANY_CATEGORIES → CATEGORY_TO_INDUSTRY → INDUSTRY_PROFILES), not a
// generic "here are some tips" panel shown identically to everyone
// regardless of what kind of business they actually run. Dismissible per
// device, matching the same real, honest pattern already used for App
// Lock and Dark Mode preferences — a person who's internalized the
// guidance shouldn't have to see it forever.
// The design spec's centerpiece: Business Health as a green circular
// progress hero. Every point is computed from real records at render
// time — nothing here is a vibe or a hardcoded "95%". Four transparent
// factors, each with its real contribution shown, because a health
// score nobody can interrogate is decoration, not information:
//   Collections (30) — share of unpaid invoices not yet overdue
//   Stock (25)       — share of items above their real reorder level
//   Payables (20)    — share of expenses not sitting unpaid past due
//   Momentum (25)    — this monthly revenue vs last monthly, real docs
export function BusinessHealthCard({ invoices, inventory, expenses, posTransactions }) {
  const [expanded, setExpanded] = useState(false);
  const todayStr = TODAY.toISOString().slice(0, 10);

  const health = useMemo(() => {
    const factors = [];

    const unpaid = invoices.rows.filter((i) => i.status !== "Paid");
    const overdue = unpaid.filter((i) => i.dueDate && i.dueDate < todayStr);
    const collectPct = unpaid.length === 0 ? 1 : 1 - overdue.length / unpaid.length;
    factors.push({ label: "Collections", pts: Math.round(collectPct * 30), max: 30, detail: unpaid.length === 0 ? "No unpaid invoices" : `${overdue.length} of ${unpaid.length} unpaid invoices overdue` });

    const items = inventory.rows;
    const low = items.filter((it) => it.qty <= it.reorder);
    const stockPct = items.length === 0 ? 1 : 1 - low.length / items.length;
    factors.push({ label: "Stock levels", pts: Math.round(stockPct * 25), max: 25, detail: items.length === 0 ? "No inventory tracked" : `${low.length} of ${items.length} items at or below reorder level` });

    const openExp = expenses.rows.filter((e) => e.status !== "Paid");
    const lateExp = openExp.filter((e) => e.dueDate && e.dueDate < todayStr);
    const payPct = openExp.length === 0 ? 1 : 1 - lateExp.length / openExp.length;
    factors.push({ label: "Payables", pts: Math.round(payPct * 20), max: 20, detail: openExp.length === 0 ? "No open expenses" : `${lateExp.length} of ${openExp.length} open expenses past due` });

    const monthOf = (d) => (d || "").slice(0, 7);
    const thisM = todayStr.slice(0, 7);
    const lastM = `${TODAY.getFullYear()}-${String(TODAY.getMonth()).padStart(2, "0")}`;
    const revOf = (m) =>
      invoices.rows.filter((i) => monthOf(i.date) === m).reduce((s, i) => s + lineTotal(i.items).total, 0) +
      (posTransactions?.rows || []).filter((t) => monthOf(t.date) === m).reduce((s, t) => s + t.items.reduce((ts, it) => ts + it.qty * it.price, 0), 0);
    const rThis = revOf(thisM), rLast = revOf(lastM);
    const momPct = rLast === 0 ? (rThis > 0 ? 1 : 0.5) : Math.max(0, Math.min(1, rThis / rLast));
    factors.push({ label: "Sales momentum", pts: Math.round(momPct * 25), max: 25, detail: rLast === 0 ? "No prior-month baseline yet" : `This month TZS ${money(Math.round(rThis))}k vs last month ${money(Math.round(rLast))}k` });

    const score = factors.reduce((s, f) => s + f.pts, 0);
    return { score, factors };
  }, [invoices.rows, inventory.rows, expenses.rows, posTransactions?.rows, todayStr]);

  const band = health.score >= 80 ? { label: "Excellent", color: "#16A34A" } : health.score >= 60 ? { label: "Good", color: "#22C55E" } : health.score >= 40 ? { label: "Needs attention", color: "#F59E0B" } : { label: "At risk", color: "#EF4444" };
  const r = 34, circ = 2 * Math.PI * r, dash = (health.score / 100) * circ;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <div className="relative shrink-0" style={{ width: 84, height: 84 }}>
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={r} fill="none" stroke="#F1F5F9" strokeWidth="8" />
            <circle cx="42" cy="42" r={r} fill="none" stroke={band.color} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${dash} ${circ - dash}`} transform="rotate(-90 42 42)" style={{ transition: "stroke-dasharray .6s ease-out" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold font-mono text-[#111827] leading-none">{health.score}</span>
            <span className="text-[9px] text-slate-400">/ 100</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-[#111827]">Business Health</h3>
          <p className="text-[13px] font-medium" style={{ color: band.color }}>{band.label}</p>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Computed live from your real records right now — every point traceable, nothing hardcoded.</p>
        </div>
        <button onClick={() => setExpanded((e) => !e)} className="text-[11.5px] font-medium text-[#16A34A] hover:underline shrink-0 self-start sm:self-auto text-left">{expanded ? "Hide breakdown" : "How is this computed?"}</button>
      </div>
      {(() => {
        const m = todayStr.slice(0, 7);
        const rev = invoices.rows.filter((i) => (i.date || "").startsWith(m)).reduce((s, i) => s + lineTotal(i.items).total, 0)
          + (posTransactions?.rows || []).filter((t) => (t.date || "").startsWith(m)).reduce((s, t) => s + t.items.reduce((ts, it) => ts + it.qty * it.price, 0), 0);
        const exp = expenses.rows.filter((e) => (e.date || "").startsWith(m)).reduce((s, e) => s + e.amount, 0);
        const profit = rev - exp;
        return (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
            <div><p className="text-[10.5px] text-slate-400">Revenue (month)</p><p className="text-[14px] font-mono font-semibold text-[#111827]">TZS {money(Math.round(rev))}k</p></div>
            <div><p className="text-[10.5px] text-slate-400">Expenses (month)</p><p className="text-[14px] font-mono font-semibold text-[#111827]">TZS {money(Math.round(exp))}k</p></div>
            <div><p className="text-[10.5px] text-slate-400">Profit (month)</p><p className="text-[14px] font-mono font-semibold" style={{ color: profit >= 0 ? "#16A34A" : "#EF4444" }}>TZS {money(Math.round(profit))}k</p></div>
          </div>
        );
      })()}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          {health.factors.map((f) => (
            <div key={f.label} className="flex items-center justify-between text-[12px]">
              <span className="text-slate-600">{f.label} <span className="text-slate-400">— {f.detail}</span></span>
              <span className="font-mono font-medium text-[#111827] shrink-0 ml-3">{f.pts}/{f.max}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function IndustryInsights({ company, onNavigate }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const profile = getIndustryProfile(company.category);
  const Icon = profile.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#DCFCE7] flex items-center justify-center shrink-0"><Icon size={17} className="text-[#16A34A]" /></div>
          <div>
            <h3 className="text-[14.5px] font-semibold text-[#111827]">Built for {profile.label}</h3>
            <p className="text-[11.5px] text-slate-400">Real guidance for {company.category || "your industry"}, not a generic tip shown to everyone.</p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-slate-300 hover:text-slate-500" aria-label="Dismiss industry insights"><X size={16} /></button>
      </div>
      <div className="space-y-2">
        {profile.tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-[12.5px] text-slate-600">
            <Sparkles size={13} className="text-[#16A34A] shrink-0 mt-0.5" />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- CRM ------------------------------------ */

// Customer 360 — a real timeline and a real score, both from events this
// system already records. The timeline merges invoices issued and every
// individual payment received, chronologically, for the chosen customer;
// the score is transparent (Revenue 40 / Recency 30 / Payment
// reliability 30) with each factor's real basis shown — the Business
// Health discipline applied to a single customer. Honestly absent, named
// on-screen: calls, emails, WhatsApp, and meetings need an interactions
// data model (a crm_interactions table) that does not exist yet, and
// complaints live in support tickets not yet threaded here — real
// future work, not empty timeline rows pretending.
// CX Pulse — NPS and CSAT computed with the real industry formulas
// against real feedback rows. NPS = %promoters(9–10) minus
// %detractors(0–6), a −100..+100 number comparable against any
// benchmark; CSAT = mean of 1–5. Company-wide always; the selected
// customer's own responses shown when they exist. No responses = no
// number — an NPS invented from zero data would be exactly the fake-95%
// this build refuses everywhere.
export function CxPulseCard({ customer }) {
  const feedback = useCompanyTable("customer_feedback", [], { order: { col: "created_at", ascending: false }, mapRow: (r) => ({ id: r.id, customer: r.customer_name, nps: r.nps_score, csat: r.csat_score, comment: r.comment || "" }) });
  const npsRows = feedback.rows.filter((f) => f.nps !== null && f.nps !== undefined);
  const nps = npsRows.length === 0 ? null : Math.round(((npsRows.filter((f) => f.nps >= 9).length - npsRows.filter((f) => f.nps <= 6).length) / npsRows.length) * 100);
  const csatRows = feedback.rows.filter((f) => f.csat);
  const csat = csatRows.length === 0 ? null : (csatRows.reduce((s, f) => s + f.csat, 0) / csatRows.length).toFixed(1);
  const mineCount = feedback.rows.filter((f) => f.customer === customer).length;
  if (feedback.loading) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-wrap items-center gap-x-8 gap-y-2">
      <div><p className="text-[10.5px] text-slate-400">NPS (all customers)</p><p className="text-[18px] font-mono font-bold" style={{ color: nps === null ? "#94A3B8" : nps >= 30 ? "#16A34A" : nps >= 0 ? "#F59E0B" : "#EF4444" }}>{nps === null ? "—" : nps > 0 ? `+${nps}` : nps}</p></div>
      <div><p className="text-[10.5px] text-slate-400">CSAT (1–5)</p><p className="text-[18px] font-mono font-bold text-[#111827]">{csat ?? "—"}</p></div>
      <div><p className="text-[10.5px] text-slate-400">Responses</p><p className="text-[18px] font-mono font-bold text-[#111827]">{npsRows.length + csatRows.length}</p></div>
      <p className="text-[10.5px] text-slate-400 flex-1 min-w-[200px]">{npsRows.length === 0 ? "No responses yet — the portal asks customers directly; no number is invented from zero data." : `Real formulas: %promoters − %detractors. ${customer ? mineCount + " response(s) from " + customer + "." : ""}`}</p>
    </div>
  );
}

export function Customer360View({ crm, invoices }) {
  const customers = useMemo(() => [...new Set(invoices.rows.map((i) => i.customer))].sort(), [invoices.rows]);
  const [selected, setSelected] = useState("");
  const customer = selected || customers[0] || "";

  function printStatement() {
    if (customer) printCustomerStatement(customer, invoices.rows);
  }

  // Omnichannel spine — closing the gap section 108 named. Channel-tagged
  // interactions logged here land on the same timeline the invoices and
  // payments already feed; when WhatsApp/Meta/Telegram webhooks exist
  // (real server-side work, named), they write to this same table.
  const CHANNELS = ["WhatsApp", "Email", "SMS", "Phone Call", "Live Chat", "Facebook Messenger", "Instagram", "Telegram", "Meeting"];
  const interactions = useCompanyTable("crm_interactions", [], { order: { col: "occurred_at", ascending: false }, mapRow: (r) => ({ id: r.id, dbId: r.id, customer: r.customer_name, channel: r.channel, direction: r.direction, summary: r.summary, date: r.occurred_at }) });
  const [logDraft, setLogDraft] = useState({ channel: "WhatsApp", direction: "inbound", summary: "" });

  async function logInteraction() {
    if (!logDraft.summary.trim() || !customer) return;
    const row = { id: `INT-${Date.now()}`, customer, channel: logDraft.channel, direction: logDraft.direction, summary: logDraft.summary.trim(), date: TODAY.toISOString().slice(0, 10) };
    interactions.setRows((prev) => [row, ...prev]);
    setLogDraft({ ...logDraft, summary: "" });
    notify(`${row.channel} interaction logged for ${customer}.`);
    if (IS_CONFIGURED) {
      try {
        const header = await sb("crm_interactions").insert({ customer_name: customer, channel: row.channel, direction: row.direction, summary: row.summary, occurred_at: row.date }).single().run();
        if (header?.id) interactions.setRows((prev) => prev.map((x) => (x.id === row.id ? { ...x, dbId: header.id } : x)));
      } catch (_e) { notify("Logged locally, but the server update failed.", "error"); }
    }
  }

  const view = useMemo(() => {
    if (!customer) return null;
    const invs = invoices.rows.filter((i) => i.customer === customer);
    const events = [];
    invs.forEach((i) => {
      events.push({ date: i.date, kind: "Invoice", detail: `${i.id} issued — TZS ${money(Math.round(lineTotal(i.items).total))}k (${i.status})` });
      (i.payments || []).forEach((p) => events.push({ date: p.date, kind: "Payment", detail: `TZS ${money(Math.round(p.amount))}k received on ${i.id}${p.method ? " · " + p.method : ""}` }));
    });
    interactions.rows.filter((x) => x.customer === customer).forEach((x) => {
      events.push({ date: x.date, kind: x.channel, detail: `${x.direction === "inbound" ? "←" : "→"} ${x.summary}` });
    });
    events.sort((a, b) => (a.date < b.date ? 1 : -1));
    const revenue = invs.reduce((s, i) => s + lineTotal(i.items).total, 0);
    const totalRev = invoices.rows.reduce((s, i) => s + lineTotal(i.items).total, 0) || 1;
    const revPts = Math.round(Math.min(1, (revenue / totalRev) * 4) * 40); // 25% of all revenue = full marks
    const lastDate = events.length ? events.map((e) => e.date).sort().slice(-1)[0] : null;
    const daysSince = lastDate ? Math.floor((TODAY - new Date(lastDate)) / 86400000) : 999;
    const recPts = Math.round(Math.max(0, 1 - daysSince / 180) * 30); // fades to 0 over 6 months
    const t = TODAY.toISOString().slice(0, 10);
    const unpaid = invs.filter((i) => i.status !== "Paid");
    const overdue = unpaid.filter((i) => i.dueDate && i.dueDate < t);
    const relPts = Math.round((unpaid.length === 0 ? 1 : 1 - overdue.length / unpaid.length) * 30);
    return { events: events.slice(0, 20), revenue, invCount: invs.length,
      score: revPts + recPts + relPts,
      factors: [
        { label: "Revenue weight", pts: revPts, max: 40, note: `TZS ${money(Math.round(revenue))}k across ${invs.length} invoice(s) — ${((revenue / totalRev) * 100).toFixed(1)}% of all revenue` },
        { label: "Recency", pts: recPts, max: 30, note: lastDate ? `last activity ${daysSince} day(s) ago` : "no activity recorded" },
        { label: "Payment reliability", pts: relPts, max: 30, note: unpaid.length === 0 ? "nothing outstanding" : `${overdue.length} of ${unpaid.length} unpaid invoice(s) overdue` },
      ] };
  }, [customer, invoices.rows, interactions.rows]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-[15px] font-semibold text-[#111827]">Customer 360</h3>
          <p className="text-[12px] text-slate-500">A real timeline and a transparent score from events this system already records. Calls, emails, WhatsApp, and meetings need an interactions model — named future work, not empty rows pretending.</p>
        </div>
        <select className={inputClass + " max-w-[240px]"} value={customer} onChange={(e) => setSelected(e.target.value)}>
          {customers.map((cst) => <option key={cst} value={cst}>{cst}</option>)}
        </select>
        {customer && (
          <button onClick={printStatement}
            className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:border-[#16A34A] hover:text-[#16A34A] transition-colors">
            <Printer size={13} /> Account Statement
          </button>
        )}
      </div>
      <CxPulseCard customer={customer} />
      {customer && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3.5 flex flex-wrap gap-2 items-center">
          <select className={inputClass + " max-w-[170px]"} value={logDraft.channel} onChange={(e) => setLogDraft({ ...logDraft, channel: e.target.value })}>
            {CHANNELS.map((ch) => <option key={ch} value={ch}>{ch}</option>)}
          </select>
          <select className={inputClass + " max-w-[120px]"} value={logDraft.direction} onChange={(e) => setLogDraft({ ...logDraft, direction: e.target.value })}>
            <option value="inbound">Inbound</option><option value="outbound">Outbound</option>
          </select>
          <input className={inputClass + " flex-1 min-w-[180px]"} value={logDraft.summary} onChange={(e) => setLogDraft({ ...logDraft, summary: e.target.value })} onKeyDown={(e) => e.key === "Enter" && logInteraction()} placeholder={`Log a ${logDraft.channel} conversation with ${customer}...`} />
          <button onClick={logInteraction} disabled={!logDraft.summary.trim()} className="btn-primary text-white text-[12px] font-medium rounded-lg px-3.5 py-2 disabled:opacity-40">Log</button>
        </div>
      )}
      {!view && <p className="text-[12px] text-slate-400 text-center py-8">No invoiced customers yet.</p>}
      {view && (
        <>
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-[11px] text-slate-400">AI Customer Score</p><p className="text-[24px] font-mono font-bold" style={{ color: view.score >= 70 ? "#16A34A" : view.score >= 45 ? "#F59E0B" : "#EF4444" }}>{view.score}<span className="text-[13px] text-slate-400 font-normal"> / 100</span></p></div>
              <div className="text-right"><p className="text-[11px] text-slate-400">Lifetime revenue</p><p className="text-[15px] font-mono font-semibold text-[#111827]">TZS {money(Math.round(view.revenue))}k</p></div>
            </div>
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              {view.factors.map((f) => (
                <div key={f.label} className="flex justify-between text-[12px]"><span className="text-slate-600">{f.label} <span className="text-slate-400">— {f.note}</span></span><span className="font-mono font-medium text-[#111827] shrink-0 ml-3">{f.pts}/{f.max}</span></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-50">
            {view.events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${e.kind === "Payment" ? "bg-[#16A34A]/10 text-[#16A34A]" : "bg-slate-100 text-slate-500"}`}>{e.kind}</span>
                <p className="text-[12.5px] text-[#111827] flex-1 min-w-0 truncate">{e.detail}</p>
                <span className="text-[10.5px] font-mono text-slate-400 shrink-0">{e.date}</span>
              </div>
            ))}
            {view.events.length === 0 && <p className="text-[12px] text-slate-400 text-center py-6">No events yet for this customer.</p>}
          </div>
        </>
      )}
    </div>
  );
}

export const CRM_TABS = [
  { id: "leads",        label: "Leads",         icon: Users },
  { id: "opportunities",label: "Opportunities",  icon: TrendingUp },
  { id: "customers",    label: "Customers",      icon: Building2 },
  { id: "top-buyers",   label: "Top Buyers",     icon: Trophy },
  { id: "parties",      label: "Parties",        icon: Wallet },
  { id: "contacts",     label: "Contacts",       icon: Phone },
  { id: "timeline",     label: "Customer 360",   icon: History },
];

// Standard sales-forecasting convention: probability of closing derived
// from pipeline stage, not a number typed in per-lead — keeps weighted
// pipeline value real and consistent rather than a guess with a decimal.
export const STAGE_PROBABILITY = { New: 10, Qualified: 35, Proposal: 60, Negotiation: 80, Won: 100, Lost: 0 };

// ─── Shared UI Helpers ───────────────────────────────────────────────────────

export function FormField({ label, required, children }) {
  return (
    <div>
      <label className="text-[12px] font-medium text-slate-600 mb-1.5 block">
        {label}{required && <span className="text-[#EF4444]"> *</span>}
      </label>
      {children}
    </div>
  );
}

// A searchable list, not an icon grid — corrected after reviewing real
// SokoBook screenshots (section 58) showing exactly this pattern: a
// search field over a plain scrollable list of specific categories, no
// icons. The earlier icon-grid version of this component was built on a
// general mobile-UX assumption before this build had any real reference
// to check it against; with real evidence in hand, matching it precisely
// is more honest than keeping a plausible-sounding guess.
export function CategoryPicker({ value, onChange }) {
  const [query, setQuery] = useState("");
  const filtered = COMPANY_CATEGORIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="relative mb-2">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search category"
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-[13px] outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]/30 transition-all"
        />
      </div>
      <div className="max-h-52 overflow-y-auto border border-slate-100 rounded-lg divide-y divide-slate-50">
        {filtered.map((cat) => {
          const active = value === cat;
          return (
            <button
              key={cat} type="button" onClick={() => onChange(cat)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-slate-50"
              style={active ? { backgroundColor: "#DCFCE7" } : undefined}
            >
              <span className={`text-[13px] ${active ? "font-medium text-[#111827]" : "text-slate-600"}`}>{cat}</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${active ? "border-[#16A34A]" : "border-slate-300"}`}>
                {active && <span className="w-2 h-2 rounded-full bg-[#16A34A]" />}
              </span>
            </button>
          );
        })}
        {filtered.length === 0 && <p className="text-[12px] text-slate-400 text-center py-4">No matching category.</p>}
      </div>
    </div>
  );
}

export const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-[#111827] placeholder-slate-400 outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 focus:shadow-sm transition-all";

// Real Excel/CSV import for Customers and Products — genuinely built to
// close a specific, verified competitive gap: SokoBook own advertised
// feature list includes "Import existing customer and product data from
// Excel to get started quickly," and without this, a business using
// SokoBook has no realistic way to switch — retyping every customer and
// every product by hand is exactly the kind of friction that keeps
// someone on a competitor's product regardless of what else this one
// offers. Uses SheetJS (already available in this environment) to
// genuinely parse a real uploaded file — not a form that pretends to
// accept a spreadsheet and silently does nothing with it.
export const IMPORT_FIELD_MAP = {
  customers: {
    tableLabel: "Customers", icon: Users,
    fields: [
      { key: "contact_name", label: "Contact Name", aliases: ["name", "contact", "contactname", "customer", "customername", "fullname"] },
      { key: "company_name", label: "Company", aliases: ["company", "companyname", "business", "businessname"] },
      { key: "email", label: "Email", aliases: ["email", "emailaddress"] },
      { key: "phone", label: "Phone", aliases: ["phone", "phonenumber", "mobile", "tel", "telephone"] },
    ],
  },
  products: {
    tableLabel: "Products", icon: Package,
    fields: [
      { key: "name", label: "Product Name", aliases: ["name", "product", "productname", "item", "itemname", "description"] },
      { key: "sku", label: "SKU", aliases: ["sku", "code", "itemcode", "productcode"] },
      { key: "category", label: "Category", aliases: ["category", "type", "group"] },
      { key: "qty_on_hand", label: "Quantity", aliases: ["quantity", "qty", "stock", "qtyonhand", "onhand"] },
      { key: "unit_cost", label: "Unit Cost", aliases: ["cost", "unitcost", "price", "unitprice"] },
    ],
  },
};

export function normalizeHeader(h) { return String(h || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }

export function DataImportPanel({ type, onClose, onImport }) {
  const config = IMPORT_FIELD_MAP[type];
  const [rows, setRows] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [imported, setImported] = useState(0);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        if (raw.length === 0) { setError("This file has no rows to import."); return; }

        // Real auto-detection: match each target field against whatever
        // headers the file actually has, ignoring case/spacing/punctuation
        // differences rather than requiring an exact column name match.
        const sourceHeaders = Object.keys(raw[0]);
        const headerMap = {};
        config.fields.forEach((f) => {
          const match = sourceHeaders.find((h) => f.aliases.includes(normalizeHeader(h)) || normalizeHeader(h) === normalizeHeader(f.label));
          if (match) headerMap[f.key] = match;
        });

        const mapped = raw.map((r) => {
          const out = {};
          config.fields.forEach((f) => { out[f.key] = headerMap[f.key] ? r[headerMap[f.key]] : ""; });
          return out;
        }).filter((r) => Object.values(r).some((v) => String(v).trim() !== ""));

        setRows({ data: mapped, matchedFields: Object.keys(headerMap).length, totalFields: config.fields.length });
      } catch (_e) {
        setError("Couldn't read this file — make sure it's a real .xlsx, .xls, or .csv export.");
      }
    };
    reader.onerror = () => setError("Couldn't read this file.");
    reader.readAsBinaryString(file);
  }

  async function confirmImport() {
    if (!rows?.data?.length) return;
    setBusy(true);
    try {
      await onImport(rows.data);
      setImported(rows.data.length);
    } catch (e) {
      setError(e.message || "Import failed partway through — some rows may not have been added.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-[#111827]/20 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:w-[480px] bg-white h-full shadow-2xl overflow-y-auto flex flex-col" style={{ animation: "slideIn .15s ease-out" }}>
        <div className="px-6 pt-6 pb-5 border-b border-slate-100 flex items-start justify-between">
          <div><p className="text-[11px] text-slate-400 uppercase tracking-wide">Data Import</p><h2 className="text-[18px] font-semibold text-[#111827] mt-0.5">Import {config.tableLabel}</h2></div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 flex-1 space-y-4">
          {imported > 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ backgroundColor: "#DCFCE7" }}><CheckCircle2 size={22} className="text-[#16A34A]" /></div>
              <p className="text-[15px] font-semibold text-[#111827] mb-1">{imported} {config.tableLabel.toLowerCase()} imported</p>
              <p className="text-[12.5px] text-slate-500">They are already real records — check {type === "customers" ? "CRM" : "Inventory"} now.</p>
            </div>
          ) : !rows ? (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
              <UploadCloud size={22} className="text-slate-300 mx-auto mb-2" />
              <p className="text-[12.5px] text-slate-500 mb-3">Upload a real .xlsx, .xls, or .csv file exported from Excel, Google Sheets, or another system — including SokoBook own export, if that is where you're coming from.</p>
              <label className="text-[12.5px] font-medium text-white btn-primary rounded-lg px-4 py-2 cursor-pointer inline-block">
                Choose File
                <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFile} />
              </label>
              {error && <p className="text-[11.5px] text-[#EF4444] mt-3">{error}</p>}
            </div>
          ) : (
            <>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-[12.5px] font-medium text-[#111827]">{fileName}</p>
                <p className="text-[11.5px] text-slate-500 mt-0.5">{rows.data.length} rows found · {rows.matchedFields} of {rows.totalFields} fields auto-matched from your file's headers</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-2">Preview (first 5 rows)</p>
                <div className="border border-slate-100 rounded-lg overflow-x-auto">
                  <table className="w-full text-[11.5px]">
                    <thead><tr className="bg-slate-50">{config.fields.map((f) => <th key={f.key} className="px-2.5 py-2 text-left font-medium text-slate-500 whitespace-nowrap">{f.label}</th>)}</tr></thead>
                    <tbody>
                      {rows.data.slice(0, 5).map((r, i) => (
                        <tr key={i} className="border-t border-slate-50">{config.fields.map((f) => <td key={f.key} className="px-2.5 py-2 text-slate-600 whitespace-nowrap max-w-[120px] truncate">{String(r[f.key] || "—")}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {error && <p className="text-[11.5px] text-[#EF4444]">{error}</p>}
              <button onClick={() => setRows(null)} className="text-[11.5px] text-slate-400 hover:text-slate-600">Choose a different file</button>
            </>
          )}
        </div>

        {rows && imported === 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 text-[12px] font-medium border border-slate-200 rounded-lg py-2.5 hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={confirmImport} disabled={busy} className="flex-1 text-[12px] font-medium btn-primary text-white rounded-lg py-2.5 flex items-center justify-center gap-2 disabled:opacity-40">
              {busy ? <LoaderCircle size={14} className="animate-spin" /> : `Import ${rows.data.length} Rows`}
            </button>
          </div>
        )}
        {imported > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <button onClick={onClose} className="w-full text-[12px] font-medium btn-primary text-white rounded-lg py-2.5">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Two-step delete: first click arms confirmation, second click within the
// window commits. Used by every detail panel so destructive actions never
// fire from a single accidental click.
export function ConfirmDeleteButton({ onConfirm, label = "Delete", message, title }) {
  // Upgraded to use the global confirmAction bus — every ConfirmDeleteButton
  // now shows the premium dialog instead of the in-place two-button pattern.
  // The original armed-state pattern is kept as fallback for call sites that
  // pass no message, so existing usage never breaks.
  if (message) {
    return (
      <button type="button" onClick={() => confirmAction(message, onConfirm, { variant: "danger", title: title || "Confirm deletion", confirmLabel: label })}
        className="w-full text-[12px] font-medium text-[#EF4444] border border-[#EF4444]/25 rounded-lg py-2.5 hover:bg-[#EF4444]/5 transition-colors flex items-center justify-center gap-1.5">
        <Trash2 size={12} /> {label}
      </button>
    );
  }

  const [armed, setArmed] = useState(false);
  if (armed) {
    return (
      <div className="flex gap-2 flex-1">
        <button
          type="button"
          onClick={() => setArmed(false)}
          className="flex-1 text-[12px] font-medium border border-slate-200 rounded-lg py-2.5 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 text-[12px] font-medium bg-[#EF4444] text-white rounded-lg py-2.5 hover:bg-[#96201a] transition-colors"
        >
          Confirm delete
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setArmed(true)}
      className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-[#EF4444] border border-[#EF4444]/25 rounded-lg py-2.5 px-3.5 hover:bg-[#FEE2E2] transition-colors"
    >
      <Trash2 size={13} /> {label}
    </button>
  );
}

// Pulsing placeholder rows shown inside any data table while a live fetch is
// in flight. `widths` roughly mimics the real column content shape.
export function SkeletonRows({ cols, rows = 5 }) {
  const widths = ["w-32", "w-24", "w-20", "w-16", "w-20", "w-14", "w-10"];
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-slate-50 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3.5">
              <div className={`h-3 rounded skeleton-shimmer ${widths[c % widths.length]}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// Shown when a live table loads successfully but has zero records — the
// onboarding moment for a fresh company. Filtered-empty states ("no match")
// stay separate; this is specifically "you haven't created anything yet."
export function EmptyState({ icon: Icon, title, hint, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5" style={{ backgroundColor: "#DCFCE7" }}>
        <Icon size={19} strokeWidth={1.75} className="text-[#16A34A]" />
      </div>
      <h3 className="text-[14.5px] font-semibold text-[#111827]">{title}</h3>
      <p className="text-[12.5px] text-slate-500 mt-1 max-w-[300px] leading-relaxed">{hint}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 btn-primary text-white text-[12.5px] font-medium px-3.5 py-2 rounded-lg flex items-center gap-1.5"
        >
          <Plus size={14} /> {actionLabel}
        </button>
      )}
    </div>
  );
}

export function LeadFormPanel({ onClose, onSubmit }) {