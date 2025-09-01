"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Zap } from "lucide-react"
import Link from "next/link"
import { UrlConverter } from "@/components/url-converter"

export default function HomePage() {
  return (
    <main>
      {/* 顶部导航 */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg">SourceForge 加速器</span>
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
            通过 CloudFlare Workers 全球网络，为中国开发者提供 SourceForge 的高速访问体验。告别缓慢下载，享受极速开发。
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
            <h2 className="text-3xl font-bold text-foreground mb-4">功能特性</h2>
            <p className="text-muted-foreground text-lg">专为中国开发者设计，极速、安全、稳定</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow text-center">
              <h3 className="font-bold text-lg mb-2">🚀 高速访问</h3>
              <p className="text-muted-foreground">通过 CloudFlare 边缘网络加速 SourceForge 资源访问</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow text-center">
              <h3 className="font-bold text-lg mb-2">🌍 多镜像支持</h3>
              <p className="text-muted-foreground">支持多个 SourceForge 镜像站选择</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow text-center">
              <h3 className="font-bold text-lg mb-2">🎨 现代界面</h3>
              <p className="text-muted-foreground">基于 shadcn/ui 的精美用户界面，响应式设计</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4">
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
            <a href="https://github.com/Zysord/sf-mirror-frontend" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
