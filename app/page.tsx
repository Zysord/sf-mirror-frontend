"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Globe, Shield, ArrowRight, BarChart3 } from "lucide-react"
import { UrlConverter } from "@/components/url-converter"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SourceForge 加速器</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                功能特性
              </a>
              <a href="#usage" className="text-muted-foreground hover:text-foreground transition-colors">
                使用方法
              </a>
              <a href="#stats" className="text-muted-foreground hover:text-foreground transition-colors">
                性能统计
              </a>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  监控面板
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Globe className="w-4 h-4 mr-2" />
            为中国开发者优化
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            SourceForge
            <span className="text-primary"> 高速访问</span>
            <br />
            开发者的加速利器
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            通过 CloudFlare Workers 全球网络，为中国开发者提供 SourceForge 的高速访问体验。 告别缓慢下载，享受极速开发。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => document.getElementById("usage")?.scrollIntoView({ behavior: "smooth" })}
            >
              立即开始使用
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full sm:w-auto">
                <BarChart3 className="w-5 h-5 mr-2" />
                查看监控面板
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* URL Converter Section */}
      <section id="usage" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">URL 转换工具</h2>
            <p className="text-muted-foreground text-lg">将 SourceForge 链接转换为加速链接，享受高速下载体验</p>
          </div>

          <UrlConverter />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">核心优势</h2>
            <p className="text-muted-foreground text-lg">
              基于 CloudFlare Workers 的全球加速网络，为您提供极致的访问体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>极速加载</CardTitle>
                <CardDescription>通过 CloudFlare 边缘网络，下载速度提升 5-10 倍</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>全球覆盖</CardTitle>
                <CardDescription>覆盖全球 200+ 城市的 CDN 节点，就近访问最优节点</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle>安全可靠</CardTitle>
                <CardDescription>企业级安全防护，SSL 加密传输，保障下载安全</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">实时性能数据</h2>
            <p className="text-muted-foreground text-lg">透明的性能指标，让您了解加速效果</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">服务可用性</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">156ms</div>
                <div className="text-sm text-muted-foreground">平均响应时间</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-chart-3 mb-2">8.5x</div>
                <div className="text-sm text-muted-foreground">平均加速倍数</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-foreground mb-2">50TB</div>
                <div className="text-sm text-muted-foreground">月流量处理</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                查看详细监控数据
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SourceForge 加速器</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                使用条款
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                技术支持
              </a>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                监控面板
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>基于 CloudFlare Workers 构建 • 为中国开发者优化 • 开源项目</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
