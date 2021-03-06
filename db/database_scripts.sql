USE [master]
GO
/****** Object:  Database [QuizWizDb]    Script Date: 1/25/2022 5:14:25 PM ******/
CREATE DATABASE [QuizWizDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QuizWizDb', FILENAME = N'C:\Users\ucren\QuizWizDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'QuizWizDb_log', FILENAME = N'C:\Users\ucren\QuizWizDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [QuizWizDb] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QuizWizDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QuizWizDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QuizWizDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QuizWizDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QuizWizDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QuizWizDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [QuizWizDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QuizWizDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QuizWizDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QuizWizDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QuizWizDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QuizWizDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QuizWizDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QuizWizDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QuizWizDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QuizWizDb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QuizWizDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QuizWizDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QuizWizDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QuizWizDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QuizWizDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QuizWizDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QuizWizDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QuizWizDb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QuizWizDb] SET  MULTI_USER 
GO
ALTER DATABASE [QuizWizDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QuizWizDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QuizWizDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QuizWizDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [QuizWizDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [QuizWizDb] SET QUERY_STORE = OFF
GO
USE [QuizWizDb]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [QuizWizDb]
GO
/****** Object:  Table [dbo].[Answer]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Answer](
	[id] [int] NOT NULL,
	[questionId] [int] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Answer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[id] [int] NOT NULL,
	[category] [nvarchar](max) NOT NULL,
	[answerId] [int] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERS]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS](
	[EMAIL] [varchar](255) NOT NULL,
	[USERNAME] [varchar](255) NOT NULL,
	[HASHED_PASSWORD] [varchar](255) NULL,
	[SALT] [varchar](255) NULL,
	[COUNTRY] [varchar](255) NULL,
	[POINTS] [int] NULL,
	[QUIZ_COUNT] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[EMAIL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateUser]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateUser] @email nvarchar(100), @userName nvarchar(100) , @Hash_Password nvarchar(100), @Salt nvarchar(100),@country nvarchar(5)
AS 
BEGIN TRY
	INSERT INTO dbo.USERS (EMAIL,USERNAME,HASHED_PASSWORD,SALT,POINTS,COUNTRY,QUIZ_COUNT)
	VALUES (@email,@userName,@Hash_Password,@Salt,0,@country,0);
END TRY

BEGIN CATCH
        SELECT  ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllUsers]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetAllUsers] 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

BEGIN TRY
    -- Insert statements for procedure here
	SELECT USERNAME,COUNTRY,POINTS,QUIZ_COUNT AS QuizCount from USERS;
END TRY
BEGIN CATCH
        SELECT  ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuiz]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetQuiz]
	-- Add the parameters for the stored procedure here
		@category NVARCHAR(max)

AS
	DECLARE @questionTable TABLE (id INT,category nvarchar(max),answerId INT, description nvarchar(max))
	
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.

    -- Insert statements for procedure here
	BEGIN TRY
		INSERT INTO @questionTable (id,category,answerId,description)
		SELECT top 20 q.id,q.category,q.answerId,q.description 
		from Question q
		where q.category = @category
		order by NEWID();

		select a.id as answerId,a.questionId as ansQuesId,a.description as answerDesc,
		q.id as questionId,q.category as category, q.description as questionDesc, q.answerId questAnsId from Answer a
		left join Question q
		ON a.questionId= q.id
		where a.questionId in (select id from @questionTable);
	END TRY
	BEGIN CATCH
        SELECT  ERROR_MESSAGE() AS ErrorMessage;  
	END CATCH;

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUser]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetUser] @email nvarchar(100) 
AS 
BEGIN TRY
	SELECT * from dbo.USERS where EMAIL = @email;
END TRY

BEGIN CATCH
        SELECT  ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdatePoints]    Script Date: 1/25/2022 5:14:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdatePoints] 
	-- Add the parameters for the stored procedure here
	@email NVARCHAR(100), @points INT, @quizCount INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	BEGIN TRY

	UPDATE USERS SET POINTS = POINTS + @points, QUIZ_COUNT = QUIZ_COUNT + 1
	WHERE EMAIL = @email;

	END TRY
	BEGIN CATCH
        SELECT  ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;
    -- Insert statements for procedure here
END
GO
USE [master]
GO
ALTER DATABASE [QuizWizDb] SET  READ_WRITE 
GO
