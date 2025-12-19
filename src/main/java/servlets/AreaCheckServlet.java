package servlets;

import PointsControl.*;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.google.gson.Gson;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            BigDecimal x = new BigDecimal(request.getParameter("X"));
            BigDecimal y = new BigDecimal(request.getParameter("Y"));
            BigDecimal r = new BigDecimal(request.getParameter("R"));
            Point point = new Point(x, y, r);

            HttpSession session = request.getSession();
            PointsHistory bean = (PointsHistory) session.getAttribute("bean");
            if (bean == null) {
                bean = new PointsHistory();
                session.setAttribute("bean", bean);
            }
            bean.addPoint(point);
            String action = request.getParameter("action");
            if ("submitForm".equals(action)) {
                request.setAttribute("X", x);
                request.setAttribute("Y", y);
                request.setAttribute("R", r);
                request.setAttribute("result", point.isInArea());
                System.out.println("должно быть перенаправление");
                RequestDispatcher dispatcher = request.getRequestDispatcher("./result.jsp");
                dispatcher.forward(request, response);

            } else if ("checkPoint".equals(action)) {
                Gson gson = new Gson();
                Map<String, Object> json = new HashMap<>();
                json.put("x", x);
                json.put("y", y);
                json.put("r", r);
                json.put("result", point.isInArea());
                String msg = gson.toJson(json);

                response.setContentType("application/json");
                response.getWriter().write(msg);
            }
        } catch (Exception e) {
            request.getRequestDispatcher("./index.jsp").forward(request, response);
        }
    }
}
