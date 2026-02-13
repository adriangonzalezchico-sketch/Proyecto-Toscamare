import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import type { PanInfo } from 'motion/react';
// replace icons with your own if needed
import { FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import sedeCentralImg from '../../assets/tiendas/SedeCentral.png';
import cartayaImg from '../../assets/tiendas/Cartaya.jpg';
import lepeImg from '../../assets/tiendas/Lepe.jpg';
import islaCristinaImg from '../../assets/tiendas/IslaCristina.JPG';
import triguerosImg from '../../assets/tiendas/Trigueros.jpg';
import sanJuanImg from '../../assets/tiendas/SanJuan.PNG';
import laPalmaImg from '../../assets/tiendas/LaPalma.jpg';
import gibraleonImg from '../../assets/tiendas/Gibraleón.png';
import ayamonte1Img from '../../assets/tiendas/Ayamonte1.png';
import ayamonte2Img from '../../assets/tiendas/Ayamonte2.jpg';
import huelva1Img from '../../assets/tiendas/Huelva1.jpg';
import huelva2Img from '../../assets/tiendas/Huelva2.jpg';
import huelva3Img from '../../assets/tiendas/Huelva3.jpg';
import palosImg from '../../assets/tiendas/PalosdelaFrontera.png';
import almonteImg from '../../assets/tiendas/Almonte.jpg';
import bonaresImg from '../../assets/tiendas/Bonares.jpg';
import bollullosImg from '../../assets/tiendas/Bollullos.png';
import moguerImg from '../../assets/tiendas/Moguer.png';
import rocianaImg from '../../assets/tiendas/Rociana.png';
import sanBartolomeImg from '../../assets/tiendas/SanBartolomé.png';
import valverdeImg from '../../assets/tiendas/Valverde.png';
import './Carousel.css';


export interface CarouselItem {
    title: string; // nombre de la tienda
    telefono: string; // teléfono de la tienda
    id: number;
    image?: string; // url de la imagen de la tienda
}

export interface CarouselProps {
    items?: CarouselItem[];
    baseWidth?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
    round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
    { id: 1, title: 'SEDE CENTRAL', telefono: '959392221', image: sedeCentralImg },
    { id: 2, title: 'CARTAYA', telefono: '959382221', image: cartayaImg },
    { id: 3, title: 'LEPE', telefono: '690825691', image: lepeImg },
    { id: 4, title: 'ISLA CRISTINA', telefono: '690825689', image: islaCristinaImg },
    { id: 5, title: 'TRIGUEROS', telefono: '690825690', image: triguerosImg },
    { id: 6, title: 'SAN JUAN DEL PUERTO', telefono: '645752089', image: sanJuanImg },
    { id: 7, title: 'LA PALMA DEL CONDADO', telefono: '959401288', image: laPalmaImg },
    { id: 8, title: 'GIBRALEÓN', telefono: '677579534', image: gibraleonImg },
    { id: 9, title: 'AYAMONTE 1', telefono: '959392221', image: ayamonte1Img },
    { id: 10, title: 'AYAMONTE 2', telefono: '685431338', image: ayamonte2Img },
    { id: 11, title: 'HUELVA 1', telefono: '626883856', image: huelva1Img },
    { id: 12, title: 'HUELVA 2', telefono: '959392221', image: huelva2Img },
    { id: 13, title: 'HUELVA 3', telefono: '959392221', image: huelva3Img },
    { id: 14, title: 'PALOS DE LA FRONTERA', telefono: '959102794', image: palosImg },
    { id: 15, title: 'ALMONTE', telefono: '959392221', image: almonteImg },
    { id: 16, title: 'BONARES', telefono: '605195677', image: bonaresImg },
    { id: 17, title: 'BOLLULLOS PAR DEL CONDADO', telefono: '959392221', image: bollullosImg },
    { id: 18, title: 'MOGUER', telefono: '635609135', image: moguerImg },
    { id: 19, title: 'ROCIANA DEL CONDADO', telefono: '645752092', image: rocianaImg },
    { id: 20, title: 'SAN BARTOLOMÉ DE LA TORRE', telefono: '620065629', image: sanBartolomeImg },
    { id: 21, title: 'VALVERDE', telefono: '959392221', image: valverdeImg },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
    item: CarouselItem;
    index: number;
    itemWidth: number;
    round: boolean;
    trackItemOffset: number;
    x: any;
    transition: any;
}

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }: CarouselItemProps) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`carousel-item ${round ? 'round' : ''}`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : 420,
                rotateY: rotateY,
                backgroundImage: item.image ? `url(${item.image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...(round && { borderRadius: '50%' })
            }}
            transition={transition}
        >
            <div className="carousel-item-gradient" />
            <div className="carousel-item-content">
                <div className="carousel-item-title">{item.title}</div>
                {item.telefono && (
                    <a
                        className="carousel-item-phone"
                        href={`tel:+34${item.telefono.replace(/\s+/g, '')}`}
                        style={{ textDecoration: 'none' }}
                        title={`Llamar a ${item.telefono}`}
                    >
                        <FiPhone className="carousel-item-phone-icon" />
                        <span style={{ letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}>
                            +34 {item.telefono.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}
                        </span>
                    </a>
                )}
            </div>
        </motion.div>

    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 440,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false
}: CarouselProps): React.JSX.Element {
    // Responsive baseWidth
    const [responsiveWidth, setResponsiveWidth] = useState(baseWidth);

    useEffect(() => {
        function handleResize() {
            const vw = window.innerWidth;
            // Safer calculations for mobile
            if (vw < 520) {
                // Full width minus some safety margin for the container padding
                // Container padding is 24px (from CSS refactor) * 2 sides = 48px
                // Add a bit more for safety: 56px
                setResponsiveWidth(vw - 56);
            }
            else if (vw < 800) {
                setResponsiveWidth(Math.min(baseWidth, vw - 48));
            }
            else {
                setResponsiveWidth(baseWidth);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [baseWidth]);

    // Match CSS padding for correct item math
    const containerPadding = 24; // Must match CSS .carousel-container padding
    // If we want the item to be full width of the container:
    const itemWidth = responsiveWidth - (containerPadding * 2);
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState<number>(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div style={{ position: 'relative', width: `${responsiveWidth}px`, maxWidth: '100vw', margin: '0 auto' }}>
            {/* Flecha izquierda fuera del contenedor principal */}
            <button
                className="carousel-arrow carousel-arrow-left"
                aria-label="Anterior"
                onClick={() => setPosition(prev => Math.max(0, prev - 1))}
                tabIndex={0}
            >
                <FiChevronLeft />
            </button>
            <div
                ref={containerRef}
                className={`carousel-container ${round ? 'round' : ''}`}
                style={{
                    width: `${responsiveWidth}px`,
                    maxWidth: '100vw',
                    ...(round && { height: `${responsiveWidth}px`, borderRadius: '50%' })
                }}
            >
                <motion.div
                    className="carousel-track"
                    drag={isAnimating ? false : 'x'}
                    {...dragProps}
                    style={{
                        width: itemWidth,
                        gap: `${GAP}px`,
                        perspective: 1000,
                        perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                        x
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -(position * trackItemOffset) }}
                    transition={effectiveTransition}
                    onAnimationStart={handleAnimationStart}
                    onAnimationComplete={handleAnimationComplete}
                >
                    {itemsForRender.map((item, index) => (
                        <CarouselItem
                            key={`${item?.id ?? index}-${index}`}
                            item={item}
                            index={index}
                            itemWidth={itemWidth}
                            round={round}
                            trackItemOffset={trackItemOffset}
                            x={x}
                            transition={effectiveTransition}
                        />
                    ))}
                </motion.div>
                {/* Barra de progreso */}
                <div className="carousel-progress-bar-container">
                    <div
                        className="carousel-progress-bar-bg"
                    >
                        <div
                            className="carousel-progress-bar-fill"
                            style={{
                                width: `${((activeIndex + 1) / items.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
                {/* Eliminados los indicadores de puntos para dejar solo la barra de progreso */}
            </div>
            {/* Flecha derecha fuera del contenedor principal */}
            <button
                className="carousel-arrow carousel-arrow-right"
                aria-label="Siguiente"
                onClick={() => setPosition(prev => Math.min(itemsForRender.length - 1, prev + 1))}
                tabIndex={0}
            >
                <FiChevronRight />
            </button>
        </div>
    );
}