<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="PointsControl.PointsHistory" %>
<%@ page import="PointsControl.Point" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Second Web lab</title>
    <link rel="stylesheet" href="index.css">
    
</head>
<body>
    <video id="video" autoplay muted playsinline></video>
    <table id="main">
        <tr>
            <td>
                <img src="./НормВазгВыр.png" height="100px" width="100px">
            </td>
            <td class="header">Васильев Александр, P3214, 54555 вариант</td>
            <td><a href="https://github.com/trait-de-la-mer" target="_blank">github </a></td>
        </tr>
        <tr>
            <td rowspan="2"></td>
            <td><canvas width="450" height="450"></canvas></td>
            <td rowspan="2">
                <table id="result">
                    <tr                                                                                                                                     >
                        <td>x</td>
                        <td>y</td>
                        <td>R</td>
                        <td>Result</td>
                    </tr>
                    <%
                        PointsHistory bean = (PointsHistory) session.getAttribute("bean"); 
                        if (bean != null){
                            for (Point point : bean.getPoints()) { %>
                    <tr>
                        <td>
                            <%= point.getX() %>
                        </td>
                        <td>
                            <%= point.getY() %>
                        </td>
                        <td>
                            <%= point.getR() %>
                        </td>
                        <td>
                            <%= point.isInArea()%>
                        </td>
                    </tr>
                    <% }} %>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <form action="/" method="POST" id="dataForm">
                    <fieldset id="xs">
                        <legend>Выбери X</legend>
                        <input type="checkbox" class="x" value="-4"> -4
                        <input type="checkbox" class="x" value="-3"> -3
                        <input type="checkbox" class="x" value="-2"> -2
                        <input type="checkbox" class="x" value="-1"> -1
                        <input type="checkbox" class="x" value="0" checked> 0
                        <input type="checkbox" class="x" value="1"> 1
                        <input type="checkbox" class="x" value="2"> 2
                        <input type="checkbox" class="x" value="3"> 3
                        <input type="checkbox" class="x" value="4"> 4
                    </fieldset>
                    <fieldset>
                        <div>Введи Y: 
                            <input required class="param" id="y" value="0" autocomplete="off"/>
                            <div id="error" hidden>
                                Y должен быть числом от -5 до 5
                            </div>  
                            R: 
                            <input type="button" id="r" value="1">
                            <input type="button" id="r" value="1.5">
                            <input type="button" id="r" value="2">
                            <input type="button" id="r" value="2.5">
                            <input type="button" id="r" value="3">
                            <button type="submit" class="r">submit</button>
                        </div>
                    </fieldset>
               </form>
            </td>
        </tr>
        <tr> 
            <td colspan="3" class="footer">Санкт-Петербург 2025</td>
        </tr>
    </table>
    <script src="index.js"></script>
</body>
</html>