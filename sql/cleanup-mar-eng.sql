-- 1️⃣ Create new table with unique Key
CREATE TABLE MarathiEnglishMerged (
    [Key] NVARCHAR(255) PRIMARY KEY,
    Meaning1 NVARCHAR(255),
    Meaning2 NVARCHAR(255),
    Meaning3 NVARCHAR(255),
    Meaning4 NVARCHAR(255),
    Meaning5 NVARCHAR(255),
    Meaning6 NVARCHAR(255),
    Meaning7 NVARCHAR(255),
    Meaning8 NVARCHAR(255)
);

-- 2️⃣ Insert merged values from duplicates
INSERT INTO MarathiEnglishMerged ([Key], Meaning1, Meaning2, Meaning3, Meaning4, Meaning5, Meaning6, Meaning7, Meaning8)
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
        ROW_NUMBER() OVER (PARTITION BY [Key] ORDER BY (SELECT NULL)) AS rn
    FROM (
        SELECT [Key], Meaning1 AS Meaning FROM MarathiEnglish WHERE Meaning1 IS NOT NULL
        UNION ALL
        SELECT [Key], Meaning2 FROM MarathiEnglish WHERE Meaning2 IS NOT NULL
        UNION ALL
        SELECT [Key], Meaning3 FROM MarathiEnglish WHERE Meaning3 IS NOT NULL
        UNION ALL
        SELECT [Key], Meaning4 FROM MarathiEnglish WHERE Meaning4 IS NOT NULL
    ) t
) ranked
GROUP BY [Key];
