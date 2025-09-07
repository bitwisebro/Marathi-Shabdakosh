-- 1. Create new table
CREATE TABLE EnglishMarathiMerged (
    [Key] NVARCHAR(255),
    Meaning1 NVARCHAR(255),
    Meaning2 NVARCHAR(255),
    Meaning3 NVARCHAR(255),
    Meaning4 NVARCHAR(255),
    Meaning5 NVARCHAR(255),
    Meaning6 NVARCHAR(255),
    Meaning7 NVARCHAR(255),
    Meaning8 NVARCHAR(255)
);

-- 2. Insert merged data
INSERT INTO EnglishMarathiMerged ([Key], Meaning1, Meaning2, Meaning3, Meaning4, Meaning5, Meaning6, Meaning7, Meaning8)
SELECT 
    [Key],
    MAX(CASE WHEN rn = 1 THEN Meaning END) AS Meaning1,
    MAX(CASE WHEN rn = 2 THEN Meaning END) AS Meaning2,
    MAX(CASE WHEN rn = 3 THEN Meaning END) AS Meaning3,
    MAX(CASE WHEN rn = 4 THEN Meaning END) AS Meaning4,
    MAX(CASE WHEN rn = 5 THEN Meaning END) AS Meaning5,
    MAX(CASE WHEN rn = 6 THEN Meaning END) AS Meaning6,
    MAX(CASE WHEN rn = 7 THEN Meaning END) AS Meaning7,
    MAX(CASE WHEN rn = 8 THEN Meaning END) AS Meaning8
FROM (
    SELECT 
        [Key], 
        Meaning,
        ROW_NUMBER() OVER (PARTITION BY [Key] ORDER BY Meaning) AS rn
    FROM (
        SELECT [Key], Meaning1 AS Meaning FROM EnglishMarathi WHERE Meaning1 IS NOT NULL
        UNION
        SELECT [Key], Meaning2 FROM EnglishMarathi WHERE Meaning2 IS NOT NULL
        UNION
        SELECT [Key], Meaning3 FROM EnglishMarathi WHERE Meaning3 IS NOT NULL
        UNION
        SELECT [Key], Meaning4 FROM EnglishMarathi WHERE Meaning4 IS NOT NULL
    ) AS AllMeanings
) AS Numbered
WHERE rn <= 8
GROUP BY [Key];
