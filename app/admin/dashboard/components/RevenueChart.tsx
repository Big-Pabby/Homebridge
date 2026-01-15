import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { ChevronDown, MoreVertical } from "lucide-react";

interface RevenueData {
  month: string;
  revenue: number;
}

interface BreakdownData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface BarChartDataPoint {
  index: number;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
}

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("Monthly");

  // Revenue performance data
  const revenueData: RevenueData[] = [
    { month: "Jan", revenue: 250000 },
    { month: "Feb", revenue: 280000 },
    { month: "Mar", revenue: 320000 },
    { month: "Apr", revenue: 310000 },
    { month: "May", revenue: 290000 },
    { month: "Jun", revenue: 250000 },
    { month: "Jul", revenue: 245000 },
    { month: "Aug", revenue: 380000 },
    { month: "Sep", revenue: 800000 },
    { month: "Oct", revenue: 250000 },
    { month: "Nov", revenue: 240000 },
    { month: "Dec", revenue: 260000 },
  ];

  // Revenue breakdown data
  const breakdownData: BreakdownData[] = [
    { name: "Property Sales", value: 460, color: "#8b5cf6", percentage: 46 },
    {
      name: "Premium Subscription",
      value: 200,
      color: "#fbbf24",
      percentage: 20,
    },
    { name: "Transaction Fees", value: 290, color: "#f97316", percentage: 29 },
    { name: "Resale Commission", value: 50, color: "#e879f9", percentage: 5 },
  ];

  const totalRevenue: number = breakdownData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Generate bar chart data
  const barChartData: BarChartDataPoint[] = Array.from(
    { length: 40 },
    (_, i) => {
      const category = breakdownData[i % breakdownData.length];
      return {
        index: i,
        value: Math.random() * 100 + 20,
        color: category.color,
      };
    }
  );

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            ₦{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Revenue Performance
        </h2>
        <button className="flex items-center border border-[#E7E8EA] gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          {timeframe}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="relative h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value: number) =>
                `₦${(value / 1000).toFixed(0)}K`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* August Revenue Label */}
        <div className="absolute top-4 right-20 bg-white px-3 py-1 rounded-lg shadow-md border border-gray-100">
          <p className="text-xs text-gray-500">August Revenue</p>
          <p className="text-sm font-bold text-gray-800">₦800,345M</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
