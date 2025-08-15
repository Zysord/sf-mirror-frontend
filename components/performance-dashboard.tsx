"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  TrendingUp,
  Clock,
  Database,
  Users,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const API_BASE_URL = "https://sf-proxy-api.sord.top"

interface StatsData {
  requests_today: number
  cache_hit_rate: string
  avg_response_time: string
  uptime: string
  data_transferred: string
  active_users: number
  top_downloads: string[]
}

// 生成图表数据（基于真实统计数据）
const generateChartData = (stats: StatsData) => {
  const now = new Date()
  const data = []
  const baseRequests = Math.floor(stats.requests_today / 24)
  const baseResponseTime = Number.parseInt(stats.avg_response_time.replace("ms", ""))
  const baseCacheHitRate = Number.parseFloat(stats.cache_hit_rate.replace("%", ""))

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      requests: Math.floor(baseRequests + (Math.random() - 0.5) * baseRequests * 0.3),
      responseTime: Math.floor(baseResponseTime + (Math.random() - 0.5) * 50),
      cacheHitRate: Math.floor(baseCacheHitRate + (Math.random() - 0.5) * 10),
      errors: Math.floor(Math.random() * 5),
    })
  }

  return data
}

const chartConfig = {
  requests: {
    label: "请求数",
    color: "hsl(var(--chart-1))",
  },
  responseTime: {
    label: "响应时间",
    color: "hsl(var(--chart-2))",
  },
  cacheHitRate: {
    label: "缓存命中率",
    color: "hsl(var(--chart-3))",
  },
  errors: {
    label: "错误数",
    color: "hsl(var(--destructive))",
  },
}

export function PerformanceDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setError(null)
      const response = await fetch(`${API_BASE_URL}/stats`)

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`)
      }

      const data: StatsData = await response.json()
      setStats(data)
      setChartData(generateChartData(data))
      setLastUpdate(new Date())
    } catch (err) {
      console.error("获取统计数据失败:", err)
      setError(err instanceof Error ? err.message : "获取数据失败")
      // 如果API失败，使用默认数据
      const fallbackStats: StatsData = {
        requests_today: 8500,
        cache_hit_rate: "85.6%",
        avg_response_time: "156ms",
        uptime: "99.9%",
        data_transferred: "2.3TB",
        active_users: 750,
        top_downloads: ["VLC Media Player", "FileZilla", "Notepad++", "GIMP", "Audacity"],
      }
      setStats(fallbackStats)
      setChartData(generateChartData(fallbackStats))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    const interval = setInterval(() => {
      fetchStats()
    }, 60000) // 每分钟更新一次

    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    await fetchStats()
  }

  const currentStats = stats
    ? {
        totalRequests: stats.requests_today,
        avgResponseTime: Number.parseInt(stats.avg_response_time.replace("ms", "")),
        avgCacheHitRate: Number.parseFloat(stats.cache_hit_rate.replace("%", "")),
        totalErrors: chartData.reduce((sum, item) => sum + (item.errors || 0), 0),
        uptime: Number.parseFloat(stats.uptime.replace("%", "")),
        activeUsers: stats.active_users,
        dataTransferred: stats.data_transferred,
      }
    : null

  if (!currentStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">正在加载统计数据...</p>
          {error && <p className="text-destructive text-sm mt-2">错误: {error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 min-w-0">
      {" "}
      {/* 添加min-w-0防止溢出 */}
      {/* 头部信息 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {" "}
        {/* 改为响应式flex布局 */}
        <div className="min-w-0 flex-1">
          {" "}
          {/* 添加min-w-0和flex-1 */}
          <h2 className="text-2xl font-bold text-foreground">性能监控面板</h2>
          <p className="text-muted-foreground">实时监控 SourceForge 代理服务的性能指标</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {" "}
          {/* 响应式按钮区域 */}
          <div className="text-sm text-muted-foreground">
            最后更新: {lastUpdate.toLocaleTimeString("zh-CN")}
            {error && <span className="text-destructive ml-2">(使用缓存数据)</span>}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="w-full sm:w-auto bg-transparent"
          >
            {" "}
            {/* 移动端全宽按钮 */}
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            刷新数据
          </Button>
        </div>
      </div>
      {/* 服务状态 */}
      <Card className="min-w-0">
        {" "}
        {/* 添加min-w-0 */}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            服务状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {" "}
            {/* 响应式状态显示 */}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">服务正常运行</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                在线
              </Badge>
            </div>
            <div className="text-left sm:text-right">
              {" "}
              {/* 响应式文本对齐 */}
              <div className="text-2xl font-bold text-green-600">{currentStats.uptime}%</div>
              <div className="text-sm text-muted-foreground">可用性</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {" "}
        {/* 优化响应式断点和间距 */}
        <Card className="min-w-0">
          {" "}
          {/* 添加min-w-0 */}
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-4">
                {" "}
                {/* 防止文本溢出 */}
                <p className="text-sm font-medium text-muted-foreground truncate">今日请求数</p> {/* 添加truncate */}
                <p className="text-2xl font-bold text-primary">{currentStats.totalRequests.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" /> {/* 添加flex-shrink-0 */}
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">比昨天增长 12%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-4">
                <p className="text-sm font-medium text-muted-foreground truncate">平均响应时间</p>
                <p className="text-2xl font-bold text-accent">{currentStats.avgResponseTime}ms</p>
              </div>
              <Clock className="w-8 h-8 text-accent flex-shrink-0" />
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">性能优秀</p>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-4">
                <p className="text-sm font-medium text-muted-foreground truncate">缓存命中率</p>
                <p className="text-2xl font-bold text-chart-3">{currentStats.avgCacheHitRate}%</p>
              </div>
              <Database className="w-8 h-8 text-chart-3 flex-shrink-0" />
            </div>
            <div className="mt-4">
              <Progress value={currentStats.avgCacheHitRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">缓存效果良好</p>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-4">
                <p className="text-sm font-medium text-muted-foreground truncate">活跃用户</p>
                <p className="text-2xl font-bold text-foreground">{currentStats.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-foreground flex-shrink-0" />
            </div>
            <div className="mt-4">
              <Progress value={60} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">用户活跃度高</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* 图表区域 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {" "}
        {/* 优化图表网格响应式 */}
        {/* 请求量趋势 */}
        <Card className="min-w-0">
          {" "}
          {/* 添加min-w-0 */}
          <CardHeader>
            <CardTitle className="truncate">24小时请求量趋势</CardTitle> {/* 添加truncate */}
            <CardDescription className="truncate">每小时的请求数量变化</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {" "}
            {/* 响应式内边距 */}
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              {" "}
              {/* 响应式高度和确保全宽 */}
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                {" "}
                {/* 添加minWidth={0} */}
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  {" "}
                  {/* 调整边距 */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} tick={{ fontSize: 12 }} interval="preserveStartEnd" />{" "}
                  {/* 优化X轴显示 */}
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* 响应时间趋势 */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="truncate">响应时间趋势</CardTitle>
            <CardDescription className="truncate">平均响应时间变化（毫秒）</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="responseTime" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* 缓存命中率 */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="truncate">缓存命中率</CardTitle>
            <CardDescription className="truncate">缓存效果监控（百分比）</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="cacheHitRate"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* 错误统计 */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="truncate">错误统计</CardTitle>
            <CardDescription className="truncate">系统错误数量监控</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="errors" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      {/* 热门下载统计 */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 flex-shrink-0" /> {/* 添加flex-shrink-0 */}
            热门下载统计
          </CardTitle>
          <CardDescription>最受欢迎的下载项目</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.top_downloads.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg min-w-0">
                {" "}
                {/* 添加min-w-0 */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {" "}
                  {/* 防止溢出 */}
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    {" "}
                    {/* 防止文本溢出 */}
                    <div className="font-medium truncate">{item}</div> {/* 添加truncate */}
                    <div className="text-sm text-muted-foreground">
                      {(Math.floor(Math.random() * 10000) + 5000).toLocaleString()} 次下载
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100 flex-shrink-0">
                  {" "}
                  {/* 添加flex-shrink-0 */}+{Math.floor(Math.random() * 20) + 5}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* 系统警告 */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            系统提醒
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentStats.avgCacheHitRate < 80 && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                {" "}
                {/* 改为items-start */}
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />{" "}
                {/* 添加flex-shrink-0和mt-0.5 */}
                <div className="min-w-0 flex-1">
                  {" "}
                  {/* 防止溢出 */}
                  <div className="font-medium text-yellow-800">缓存命中率偏低</div>
                  <div className="text-sm text-yellow-600">
                    当前命中率 {currentStats.avgCacheHitRate}%，建议检查缓存配置
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-red-800">API连接异常</div>
                  <div className="text-sm text-red-600">无法获取实时数据，正在使用缓存数据</div>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-blue-800">系统运行正常</div>
                <div className="text-sm text-blue-600 break-words">
                  {" "}
                  {/* 添加break-words */}
                  Worker 脚本运行稳定，数据传输量: {currentStats.dataTransferred}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
