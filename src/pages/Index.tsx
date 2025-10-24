import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Tutorial {
  id: number;
  title: string;
  type: 'video' | 'article';
  duration?: string;
  readTime?: string;
  description: string;
  difficulty: 'Начальный' | 'Средний' | 'Продвинутый';
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('Главная');
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Спиннинг Shimano Catana', price: 4500, category: 'Удилища', image: '' },
    { id: 2, name: 'Катушка Daiwa Ninja', price: 3200, category: 'Катушки', image: '' },
    { id: 3, name: 'Леска Power Pro 0.15', price: 890, category: 'Лески', image: '' },
    { id: 4, name: 'Приманка Mepps Aglia', price: 450, category: 'Приманки', image: '' },
    { id: 5, name: 'Поплавки набор 10шт', price: 320, category: 'Оснастка', image: '' },
    { id: 6, name: 'Крючки Owner 50шт', price: 280, category: 'Оснастка', image: '' },
  ];

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: 'Спиннинговая ловля для начинающих',
      type: 'video',
      duration: '15 мин',
      description: 'Основы спиннинговой рыбалки: выбор удилища, техника заброса и проводки',
      difficulty: 'Начальный'
    },
    {
      id: 2,
      title: 'Как правильно вязать рыболовные узлы',
      type: 'article',
      readTime: '8 мин',
      description: 'Подробное руководство по самым надёжным рыболовным узлам',
      difficulty: 'Начальный'
    },
    {
      id: 3,
      title: 'Ловля щуки на джиг',
      type: 'video',
      duration: '22 мин',
      description: 'Продвинутая техника джиговой ловли хищника в различных условиях',
      difficulty: 'Продвинутый'
    },
    {
      id: 4,
      title: 'Секреты поплавочной рыбалки',
      type: 'article',
      readTime: '12 мин',
      description: 'Тонкости настройки снасти и выбора прикормки для мирной рыбы',
      difficulty: 'Средний'
    },
    {
      id: 5,
      title: 'Ловля на фидер: от А до Я',
      type: 'video',
      duration: '28 мин',
      description: 'Полный гид по фидерной ловле: снасти, монтажи, техника',
      difficulty: 'Средний'
    },
    {
      id: 6,
      title: 'Зимняя рыбалка: первый лёд',
      type: 'article',
      readTime: '10 мин',
      description: 'Безопасность и эффективные методы ловли в начале зимнего сезона',
      difficulty: 'Начальный'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    if (activeSection === 'Техники') {
      return (
        <section className="py-16 bg-white/50 backdrop-blur">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-4 text-primary">Обучение рыбалке</h3>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Видеоуроки и статьи от профессионалов
            </p>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="all">Всё</TabsTrigger>
                <TabsTrigger value="video">
                  <Icon name="Video" size={16} className="mr-2" />
                  Видео
                </TabsTrigger>
                <TabsTrigger value="article">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  Статьи
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.map(tutorial => (
                    <Card key={tutorial.id} className="hover:shadow-xl transition-all hover-scale">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={tutorial.type === 'video' ? 'default' : 'secondary'}>
                            <Icon name={tutorial.type === 'video' ? 'Video' : 'BookOpen'} size={14} className="mr-1" />
                            {tutorial.type === 'video' ? tutorial.duration : tutorial.readTime}
                          </Badge>
                          <Badge variant="outline">{tutorial.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          <Icon name={tutorial.type === 'video' ? 'Play' : 'FileText'} size={18} className="mr-2" />
                          {tutorial.type === 'video' ? 'Смотреть' : 'Читать'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.filter(t => t.type === 'video').map(tutorial => (
                    <Card key={tutorial.id} className="hover:shadow-xl transition-all hover-scale">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge>
                            <Icon name="Video" size={14} className="mr-1" />
                            {tutorial.duration}
                          </Badge>
                          <Badge variant="outline">{tutorial.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          <Icon name="Play" size={18} className="mr-2" />
                          Смотреть
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="article" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.filter(t => t.type === 'article').map(tutorial => (
                    <Card key={tutorial.id} className="hover:shadow-xl transition-all hover-scale">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary">
                            <Icon name="BookOpen" size={14} className="mr-1" />
                            {tutorial.readTime}
                          </Badge>
                          <Badge variant="outline">{tutorial.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          <Icon name="FileText" size={18} className="mr-2" />
                          Читать
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl font-bold text-primary mb-6 animate-fade-in">
                Всё для рыбалки в одном месте
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональные снасти, приманки и аксессуары для успешной рыбалки
              </p>
              <div className="flex justify-center gap-4 text-4xl">
                <span>🎣</span>
                <span>🐟</span>
                <span>🌊</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/50 backdrop-blur">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary">Популярные товары</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover-scale">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Fish" size={64} className="text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <CardTitle className="mb-2">{product.name}</CardTitle>
                    <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary">Почему выбирают нас</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'Award', title: 'Качество', text: 'Только проверенные бренды' },
                { icon: 'Truck', title: 'Доставка', text: 'Быстрая доставка по всей России' },
                { icon: 'Shield', title: 'Гарантия', text: 'Официальная гарантия на всё' }
              ].map((item, idx) => (
                <Card key={idx} className="text-center p-6 hover-scale">
                  <Icon name={item.icon as any} size={48} className="mx-auto mb-4 text-secondary" />
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8F4E8] to-[#D5E8E0]">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Fish" size={32} className="text-secondary" />
              <h1 className="text-2xl font-bold">РыбаЛов</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Снасти', 'Техники', 'Водоемы'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-semibold transition-all hover:text-secondary ${
                    activeSection === section ? 'text-secondary border-b-2 border-secondary' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative bg-secondary hover:bg-secondary/90 border-0">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-destructive">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {renderContent()}

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 РыбаЛов. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
