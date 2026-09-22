importReactfrom"react";
import{Link,useNavigate,useLocation}from"react-router-dom";
import{useApp}from"../context/AppContext";
import{
ShoppingBag,
Heart,
UserasUserIcon,
Search,
Sparkles,
Menu,
X,
PackageCheck,
LogOut
}from"lucide-react";
importLogofrom"../assets/fk-logo.jpeg";
import{useState}from"react";
import{CART,HOME}from"../constants/testIds";

exportdefaultfunctionNavbar({onOpenCart}){
const{user,cart,wishlist,logoutUser}=useApp();
const[mobileMenuOpen,setMobileMenuOpen]=useState(false);
constnavigate=useNavigate();
constlocation=useLocation();

consttotalCartCount=cart.reduce((sum,item)=>sum+item.quantity,0);

constisActive=(path)=>location.pathname===path;

return(
<headerclassName="stickytop-0z-40bg-[#FFFDF8]/95backdrop-blur-mdborder-bborder-[#43111F]/30">
{/*Topannouncementbar*/}
<divclassName="bg-gradient-to-rfrom-[#43111F]via-[#6E1F35]to-[#43111F]text-whitetext-xspy-1.5px-4text-centertracking-widestuppercasefont-serifflexitems-centerjustify-centergap-2">
<SparklesclassName="w-3.5h-3.5text-white"/>
<span>WedealinalltypeofInterior&ExteriorDecor$300</span>
<SparklesclassName="w-3.5h-3.5text-white"/>
</div>

<divclassName="max-w-7xlmx-autopx-4sm:px-6lg:px-8">
<divclassName="flexitems-centerjustify-betweenh-24">

{/*BrandLogo*/}
<divclassName="flexitems-centergap-3">
<Linkto="/"className="flexitems-centergap-4group"data-testid="navbar-brand-logo">
<imgsrc={Logo}alt="FKDecore"className="w-16h-16object-containgroup-hover:scale-105transition-transformFKDecore-logo-badge"/>
<divclassName="flexflex-col">
<spanclassName="text-4xlfont-boldtracking-[0.16em]bg-gradient-to-rfrom-[#43111F]via-[#6E1F35]to-[#87344D]bg-clip-texttext-transparent"style={{fontFamily:"Didot,Bodoni72,BodoniMT,TimesNewRoman,serif"}}>FKDecore</span>
<spanclassName="text-smtracking-[0.18em]font-semiboldtext-[#6E1F35]text-center">ComefirstGetfirst</span>
</div>
</Link>
</div>

{/*DesktopNavigationLinks*/}
<navclassName="hiddenmd:flexitems-centerspace-x-8font-seriftext-smtracking-wider">
<Link
to="/"
className={`transition-colorshover:text-[#6E1F35]${isActive('/')?'text-[#6E1F35]border-bborder-[#6E1F35]pb-1':'text-[#5D5054]'}`}
data-testid="nav-link-home"
>
Home
</Link>
<Link
to="/catalog"
className={`transition-colorshover:text-[#6E1F35]${isActive('/catalog')?'text-[#6E1F35]border-bborder-[#6E1F35]pb-1':'text-[#5D5054]'}`}
data-testid="nav-link-catalog"
>
Collection(100)
</Link>
<Linkto="/#hot-arrivals"className={`transition-colorshover:text-[#6E1F35]${isActive('/new-arrivals')?'text-[#6E1F35]border-bborder-[#6E1F35]pb-1':'text-[#5D5054]'}`}>NewArrivals</Link>
<Link
to="/orders"
className={`transition-colorshover:text-[#6E1F35]${isActive('/orders')?'text-[#6E1F35]border-bborder-[#6E1F35]pb-1':'text-[#5D5054]'}`}
data-testid="nav-link-orders"
>
MyOrders
</Link>
</nav>

{/*ActionIcons*/}
<divclassName="flexitems-centerspace-x-5">
<button
onClick={()=>navigate('/catalog')}
className="p-2text-[#5D5054]hover:text-[#6E1F35]transition-colorsrelative"
title="SearchCatalog"
data-testid="nav-search-btn"
>
<SearchclassName="w-5h-5"/>
</button>

<button
onClick={()=>navigate('/orders')}
className="p-2text-[#5D5054]hover:text-[#6E1F35]transition-colorsrelativehiddensm:block"
title="Wishlist"
data-testid="nav-wishlist-btn"
>
<HeartclassName="w-5h-5"/>
{wishlist.length>0&&(
<spanclassName="absolute-top-1-right-1w-4h-4bg-[#43111F]text-[#FFFDF8]text-[10px]font-boldrounded-fullflexitems-centerjustify-center">
{wishlist.length}
</span>
)}
</button>

{/*CartDrawerTrigger*/}
<button
onClick={()=>onOpenCart?.()}
className="relativep-2.5bg-gradient-to-rfrom-[#43111F]to-[#6E1F35]borderborder-[#6E1F35]/40rounded-fulltext-whitehover:border-[#6E1F35]transition-allshadow-mdgroup"
data-testid={CART.drawerBtn}
>
<ShoppingBagclassName="w-5h-5group-hover:scale-105transition-transform"/>
{totalCartCount>0&&(
<spanclassName="absolute-top-1-right-1w-5h-5bg-[#43111F]text-[#FFFDF8]text-xsfont-boldrounded-fullflexitems-centerjustify-centershadow">
{totalCartCount}
</span>
)}
</button>

{/*UserProfile/Auth*/}
{user?(
<divclassName="relativegrouphiddensm:block">
<button
onClick={()=>navigate('/orders')}
className="flexitems-centergap-2p-1.5rounded-fullborderborder-[#6E1F35]/30hover:border-[#6E1F35]transition-allbg-[#FFFDF8]"
data-testid="nav-user-menu"
>
<divclassName="w-8h-8rounded-fullbg-[#6E1F35]/20text-[#6E1F35]flexitems-centerjustify-centerfont-seriffont-boldtext-sm">
{user.name.charAt(0)}
</div>
</button>
</div>
):(
<button
onClick={()=>navigate('/auth')}
className="hiddensm:inline-flexitems-centergap-1.5px-4py-2borderborder-[#6E1F35]text-[#6E1F35]hover:bg-[#6E1F35]hover:text-whitefont-seriftext-xsuppercasetracking-widesttransition-allrounded-sm"
data-testid="nav-login-btn"
>
<UserIconclassName="w-3.5h-3.5"/>
<span>SignIn</span>
</button>
)}

{/*Mobilemenubutton*/}
<button
onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
className="md:hiddenp-2text-[#5D5054]hover:text-[#6E1F35]"
data-testid="mobile-menu-toggle"
>
{mobileMenuOpen?<XclassName="w-6h-6"/>:<MenuclassName="w-6h-6"/>}
</button>
</div>
</div>
</div>

{/*Mobiledropdown*/}
{mobileMenuOpen&&(
<divclassName="md:hiddenbg-[#FFFDF8]border-bborder-[#43111F]/30px-4pt-2pb-6space-y-4animate-inslide-in-from-topduration-200">
<Link
to="/"
onClick={()=>setMobileMenuOpen(false)}
className="blocktext-[#2D2326]hover:text-[#43111F]font-serifpy-2border-bborder-[#E5D8D0]"
>
Home
</Link>
<Link
to="/catalog"
onClick={()=>setMobileMenuOpen(false)}
className="blocktext-[#2D2326]hover:text-[#43111F]font-serifpy-2border-bborder-[#E5D8D0]"
>
Collection(100)
</Link>
<Linkto="/#hot-arrivals"onClick={()=>setMobileMenuOpen(false)}className="blocktext-[#2D2326]hover:text-[#43111F]font-serifpy-2border-bborder-[#E5D8D0]">NewArrivals</Link>
<Link
to="/orders"
onClick={()=>setMobileMenuOpen(false)}
className="blocktext-[#2D2326]hover:text-[#43111F]font-serifpy-2border-bborder-[#E5D8D0]"
>
MyOrders
</Link>
{user?(
<button
onClick={()=>{logoutUser();setMobileMenuOpen(false);}}
className="w-fulltext-lefttext-red-400font-serifpy-2flexitems-centergap-2"
>
<LogOutclassName="w-4h-4"/>
<span>SignOut({user.name})</span>
</button>
):(
<Link
to="/auth"
onClick={()=>setMobileMenuOpen(false)}
className="blocktext-[#6E1F35]font-serifpy-2text-centerborderborder-[#6E1F35]roundeduppercasetracking-widertext-xshover:bg-[#6E1F35]hover:text-white"
>
SignIn/Register
</Link>
)}
</div>
)}
</header>
);
}






































