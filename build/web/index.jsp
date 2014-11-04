<%-- 
    Document   : index
    Created on : Jul 28, 2013, 11:32:06 PM
    Author     : jover
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8"/>
		<title>Chumby wekker</title>

		<!-- The main CSS file -->
		<link href="assets/css/style.css" rel="stylesheet" />

		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>

	<body>

		<div id="clock" class="light">
			<div class="display">
				<div class="weekdays"></div>
				<div class="alarm"></div>
				<div class="digits"></div>
			</div>

                        <div class="button-holder">
                                <a class="button">Toggle alarm</a>
                        </div>
                    
                    
		</div>
        
		<!-- JavaScript Includes -->
		<script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/moment.min.js"></script>
		<script src="assets/js/script.js"></script>

	</body>
</html>
