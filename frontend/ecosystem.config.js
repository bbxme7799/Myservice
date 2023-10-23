module.exports = {
    apps: [
      {
        name: "next-app", // ชื่อแอปพลิเคชัน
        script: "./node_modules/next/dist/bin/next", // ไฟล์ที่ใช้รัน Next.js
        args: "start", // อาร์กิวเมนต์สำหรับคำสั่ง start
        exec_mode: "cluster", // โหมดการทำงาน (cluster mode เพื่อการทำงานแบบคลัสเตอร์)
        instances: "max", // จำนวนของ Instances
        autorestart: true, // รีสตาร์ทโปรแกรมหากเกิดข้อผิดพลาด
        watch: false, // ให้ pm2 ดูไฟล์และรีสตาร์ทหากมีการเปลี่ยนแปลง
        max_memory_restart: "1G", // รีสตาร์ทหากใช้หน่วยความจำมากกว่า
      },
    ],
  };
  