package PointsControl;

import java.math.BigDecimal;
import java.util.Objects;

public class Point {
    private final BigDecimal x;
    private final BigDecimal y;
    private final BigDecimal r;

    private final boolean isInArea;

    public Point(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isInArea = colculate(x, y, r);
    }

    private boolean colculate(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (x.compareTo(BigDecimal.ZERO) > 0 && y.compareTo(BigDecimal.ZERO) > 0) {
            return false;
        }
        if ((x.compareTo(BigDecimal.ZERO) >= 0) && (y.compareTo(BigDecimal.ZERO) <= 0)){
            BigDecimal halfX = x.divide(BigDecimal.valueOf(2));
            BigDecimal halfR = r.divide(BigDecimal.valueOf(2));
            BigDecimal xMinR = halfX.subtract(halfR);
            return ((x.compareTo(r) <= 0) && (y.compareTo(xMinR) >= 0) );
        }
        if ((x.compareTo(BigDecimal.valueOf(0)) <= 0) && (y.compareTo(BigDecimal.valueOf(0)) <= 0)) {
            BigDecimal xx = x.multiply(x);
            BigDecimal yy = y.multiply(y);
            BigDecimal yyXx = yy.add(xx);
            BigDecimal rr = r.multiply(r);
            return (yyXx.compareTo(rr) <= 0);
        }
        if ((x.compareTo(BigDecimal.valueOf(0)) <= 0) && ((y.compareTo(BigDecimal.valueOf(0)) >= 0))) {
            BigDecimal halfR = r.divide(BigDecimal.valueOf(-2));
            return ((x.compareTo(halfR) >= 0) && (y.compareTo(r) <= 0));
        }
        return true;
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getR() {
        return r;
    }

    public boolean isInArea() {
        return isInArea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return Objects.equals(x, point.x) && y.compareTo(point.y) == 0 && Objects.equals(r, point.r);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r);
    }

    @Override
    public String toString() {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isInArea=" + isInArea +
                '}';
    }
}
